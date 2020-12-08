import json

from fastapi import FastAPI, File, UploadFile, Form

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/python")
async def run_python(file: UploadFile = File(...), answer: str = Form(...)):
    code = await file.read()
    with open("/code.py", "w") as f:
        f.write(code.decode('utf-8'))
    import subprocess
    proc = subprocess.run(['python3', '/code.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return {
        'stdout': proc.stdout.decode('utf-8'),
        'stderr': proc.stderr.decode('utf-8'),
        'is_correct': proc.stdout.decode('utf-8').split('\n') == json.loads(answer),
        'expected': '\n'.join(json.loads(answer))
    }
