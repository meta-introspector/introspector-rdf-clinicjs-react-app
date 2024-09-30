from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
#import numpy as np
import argparse
import os

HOST = os.environ.get("API_URL", "0.0.0.0")
PORT = os.environ.get("PORT", 7860)
parser = argparse.ArgumentParser()
parser.add_argument("--host", default=HOST)
parser.add_argument("--port", type=int, default=PORT)
parser.add_argument("--reload", action="store_true", default=True)
parser.add_argument("--ssl_certfile")
parser.add_argument("--ssl_keyfile")
args = parser.parse_args()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/invert")
async def invert(text: str):
    return {
        "original": text,
        "inverted": text[::-1],
    }


@app.get("/data")
async def get_data():
    data = {"data": [123]}
    return JSONResponse(data)


app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn

    print(args)
    uvicorn.run(
        "app:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        ssl_certfile=args.ssl_certfile,
        ssl_keyfile=args.ssl_keyfile,
    )
