Coding Drills
-------------

ウェブ上でコードを書いて実行できるアプリを試しに作ってみた

## Requirements

- Docker
- Curl
- (Git)

## Get started

### Clone repository (first time only)

```shell
git clone https://gitlab.com/technical-study/coding-drills.git coding-drills
cd coding-drills
```

### Run containers

```shell
docker-compose up -d
```

### Setup run-code server (first time only)

Access `http://localhost:8000/docs` on your browser, and click `/images/pull` -> `Try it out` -> `Execute`.

Or execute the following script:

```shell
curl http://localhost:8000/images/pull -X PATCH
```

This request returns `null`. It will take some time.

> つながらない方は Docker machine の IP でアクセスするか、ポートフォワードの設定をしてみてください。

### Play

Access `http://localhost/` on your browser, and write code (Python), run!

## Stop containers

```shell
docker-compose down --remove-orphans
```
