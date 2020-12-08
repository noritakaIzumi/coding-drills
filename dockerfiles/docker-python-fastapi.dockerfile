FROM docker:19.03.14-dind

RUN apk update \
    && apk add \
        python3 \
        py3-pip \
    && pip install \
        fastapi \
        uvicorn \
        python-multipart

WORKDIR /

EXPOSE 8000

#CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
