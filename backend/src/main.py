from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get("/")



async def root():
    return {"message": "This is the core of your personal AI assistant"}

