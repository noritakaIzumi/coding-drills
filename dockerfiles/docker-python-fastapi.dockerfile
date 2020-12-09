FROM docker:19.03.14-dind

RUN apk update \
    && apk add \
        curl \
        python3 \
        py3-pip \
    && pip install \
        fastapi \
        uvicorn \
        python-multipart \
        requests-unixsocket
