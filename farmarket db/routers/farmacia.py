from db.database import Sessao
from db.models.farmacias import Farmacia
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/farmacia",
    tags=["farmacias"]
)

class farmaciaSchema(BaseModel):
    nome: str
    imagem: str

@router.post('/cadastrar')
def cadastrar_farmacia(farmacia: farmaciaSchema):
    print(farmacia)
    with Sessao() as sessao:
        nova_farmacia = Farmacia(
            nome=farmacia.nome,
            imagem=farmacia.imagem
        )
        sessao.add(nova_farmacia)
        sessao.commit()
        sessao.refresh(nova_farmacia)
        return {"mensagem": "Farmácia cadastrada com sucesso!", "farmacia_id": nova_farmacia.id}
    
@router.delete('/deletar/{farmacia_id}')
def deletar_farmacia(farmacia_id: int):
    with Sessao() as sessao:
        farmacia_existente = sessao.get(Farmacia, farmacia_id)
        if not farmacia_existente:
            raise HTTPException(status_code=404, detail="Farmácia não encontrada")
        
        sessao.delete(farmacia_existente)
        sessao.commit()
        return {"mensagem": "Farmácia deletada com sucesso!"}