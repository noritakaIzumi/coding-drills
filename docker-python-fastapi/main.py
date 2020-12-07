from fastapi import FastAPI
from enum import Enum

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
