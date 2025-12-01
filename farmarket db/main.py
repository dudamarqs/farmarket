from fastapi import FastAPI
from db import criar_tabelas
from routers import produto
import uvicorn

criar_tabelas.add_farmacias()

app = FastAPI()
app.include_router(produto.router)

@app.get("/")
def teste():
    return {"message": "API is running"}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)