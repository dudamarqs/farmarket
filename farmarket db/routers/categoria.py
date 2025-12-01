from db.database import Sessao
from db.models.categorias import Categoria
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/categoria",
    tags=["categorias"]
)

class categoriaSchema(BaseModel):
    nome: str

@router.post('/cadastrar')
def cadastrar_categoria(categoria: categoriaSchema):
    print(categoria)
    with Sessao() as sessao:
        nova_categoria = Categoria(
            nome=categoria.nome
        )
        sessao.add(nova_categoria)
        sessao.commit()
        sessao.refresh(nova_categoria)
        return {"mensagem": "Categoria cadastrada com sucesso!", "categoria_id": nova_categoria.id}

@router.delete('/deletar/{categoria_id}')
def deletar_categoria(categoria_id: int):
    with Sessao() as sessao:
        categoria_existente = sessao.get(Categoria, categoria_id)
        if not categoria_existente:
            raise HTTPException(status_code=404, detail="Categoria não encontrada")
        
        sessao.delete(categoria_existente)
        sessao.commit()
        return {"mensagem": "Categoria deletada com sucesso!"}
    
@router.get('/listar')
def listar_categorias():
    with Sessao() as sessao:
        categorias = sessao.query(Categoria).all()
        resultado = [{"id": cat.id, "nome": cat.nome} for cat in categorias]
        return resultado