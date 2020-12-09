import json
import urllib.parse
from typing import Optional, Dict, Any, List

import requests_unixsocket
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel

app = FastAPI(
    title='Coding Drills API',
    description='Docker Engine API にリクエストを投げてコードを実行します。<br>'
                '各プログラミング言語の Docker イメージのプルもこのページから行えます。<br>'
                '<br>'
                '**初回起動時およびボリュームを作り直したときは ``/images/pull`` をやり直してください。**<br>'
                '**この画面から API を実行する際に ``TypeError: Failed to fetch`` エラーが発生した場合は、'
                '``Cancel`` で入力欄を閉じてから再度開いて試してみてください。**',
    version='0.1.0',
    openapi_tags=[
        {
            'name': 'Run Code',
            'description': '各プログラミング言語のコードを実行します。',
            'externalDocs': {
                "description": "好きなコードで実行する",
                "url": "http://localhost",
            },
        },
        {
            'name': 'Docker Images / Containers',
            'description': 'Docker イメージやコンテナに関する操作です。',
        },
    ],
)


class ResponseRunCodeStatus200(BaseModel):
    stdout: str
    stderr: str


@app.post(
    "/python",
    tags=['Run Code'],
    summary='Run python code',
    response_model=ResponseRunCodeStatus200,
)
async def run_python(file: UploadFile = File(...)) -> Dict[str, str]:
    """Python プログラムを実行します。

    - **file**: ファイル名。 (required)

    \f

    Args:
        file (UploadFile): Code to run.

    Returns:
        stdout, stderr.

    Examples:
        ``Returns`` is such as::

            {
                'stdout': stdout,
                'stderr': stderr,
            }

    """
    code = await file.read()
    with open("code.py", "w") as f:
        f.write(code.decode('utf-8'))

    unix_socket = urllib.parse.quote('/var/run/docker.sock', safe='')
    containers_path = '/v1.40/containers'

    with requests_unixsocket.Session() as session:

        # Create a container
        container_name = 'python'
        operation = f'/create?name={container_name}'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        data = json.dumps({
            'Image': 'python:3.9-slim-buster',
            'Cmd': ['python', '/code.py'],
            'Mounts': [
                {
                    'Target': '/code.py',
                    'Source': '/docker-python-fastapi/code.py',
                    'Type': 'bind',
                    'ReadOnly': True,
                },
            ],
        }).encode()
        header = {'Content-Type': 'application/json'}

        session.post(url, data=data, headers=header)

        # Start the container
        operation = f'/{container_name}/start'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        session.post(url)

        # Wait the container
        operation = f'/{container_name}/wait'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        _ = session.post(url).json()['StatusCode']

        # Check logs
        operation = f'/{container_name}/logs?stdout=1'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        stdout = session.get(url)
        fmt_stdout = '\n'.join(map(lambda s: s[8:], stdout.text.rstrip().split('\n')))  # first 8 chars are binary

        operation = f'/{container_name}/logs?stderr=1'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        stderr = session.get(url)
        fmt_stderr = '\n'.join(map(lambda s: s[8:], stderr.text.rstrip().split('\n')))  # first 8 chars are binary

        # Delete the container
        operation = f'/{container_name}'
        url = f'http+unix://{unix_socket}{containers_path}{operation}'

        session.delete(url)

    return {
        'stdout': fmt_stdout,
        'stderr': fmt_stderr,
    }


@app.patch(
    "/images/pull",
    tags=['Docker Images / Containers'],
    summary='Pull Docker images',
)
async def images_pull():
    """Docker イメージをプルします。

    <b>初回起動時およびボリュームを作り直したときに必ず実行してください。</b>でないとソースコードが実行できません。

    \f

    Returns:
        void:

    """
    session = requests_unixsocket.Session()
    unix_socket = urllib.parse.quote('/var/run/docker.sock', safe='')
    url = f'http+unix://{unix_socket}/v1.40/images/create?fromImage=python&tag=3.9-slim-buster'
    session.post(url)


@app.get(
    "/images/list",
    tags=['Docker Images / Containers'],
    summary='Get list of Docker images',
)
async def images_list() -> dict:
    """Docker イメージの一覧を表示します。

    \f

    Returns:
        dict: List of docker images.

    """
    session = requests_unixsocket.Session()
    unix_socket = urllib.parse.quote('/var/run/docker.sock', safe='')
    url = f'http+unix://{unix_socket}/v1.40/images/json'
    resp = session.get(url).json()
    return resp


class ResponseContainerPruneStatus200(BaseModel):
    ContainersDeleted: Optional[List[str]]
    SpaceReclaimed: Optional[int]


class ResponseContainerPruneStatus500(BaseModel):
    message: str


@app.delete(
    "/containers/prune",
    tags=['Docker Images / Containers'],
    summary="Delete stopped containers",
    responses={
        200: {
            "description": """- ``ContainersDeleted``: Container IDs that were deleted.
- ``SpaceReclaimed``: Disk space reclaimed in bytes.""",
            "model": ResponseContainerPruneStatus200,
        },
        500: {
            "description": """- ``message``: The error message.""",
            "model": ResponseContainerPruneStatus500,
        }
    },
)
async def containers_prune() -> Dict[str, Any]:
    """停止している・残っているコンテナを削除します。

    \f

    Returns:
        dict: 消えたコンテナの詳細。

    """
    session = requests_unixsocket.Session()
    unix_socket = urllib.parse.quote('/var/run/docker.sock', safe='')
    url = f'http+unix://{unix_socket}/v1.40/containers/prune'
    resp = session.post(url).json()
    return resp
