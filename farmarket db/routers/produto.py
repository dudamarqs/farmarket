from fastapi import APIRouter, HTTPException
from db.database import Sessao
from pydantic import BaseModel
from db.models.produtos import Produto
from typing import Optional

router = APIRouter(
    prefix="/produtos",
    tags=["produtos"]
)

class produtoSchema(BaseModel):
    nome: str
    descricao: str
    preco: float
    estoque: int
    imagem: Optional[str]
    farmacia_id: Optional[int]

@router.post('/cadastrar')
def cadastrar_produto(produto: produtoSchema):
    print(produto)
    with Sessao() as sessao:
        novo_produto = Produto(
            nome=produto.nome,
            descricao=produto.descricao,
            preco=produto.preco,
            estoque=produto.estoque,
            imagem=produto.imagem,
            farmacia_id=produto.farmacia_id
        )
        sessao.add(novo_produto)
        sessao.commit()
        sessao.refresh(novo_produto)
        return {"detail": "Produto cadastrado com sucesso!", "produto_id": novo_produto.id}
    
@router.put('/atualizar/{produto_id}')
def atualizar_produto(produto_id: int, produto: produtoSchema):
    with Sessao() as sessao:
        produto_existente = sessao.get(Produto, produto_id)
        if not produto_existente:
            raise HTTPException(status_code=404, detail="Produto não encontrado")
        
        produto_existente.nome = produto.nome
        produto_existente.descricao = produto.descricao
        produto_existente.preco = produto.preco
        produto_existente.estoque = produto.estoque
        produto_existente.imagem = produto.imagem
        produto_existente.farmacia_id = produto.farmacia_id
        
        sessao.commit()
        return {"detail": "Produto atualizado com sucesso!"}
    
@router.delete('/deletar/{produto_id}')
def deletar_produto(produto_id: int):
    with Sessao() as sessao:
        produto_existente = sessao.get(Produto, produto_id)
        if not produto_existente:
            raise HTTPException(status_code=404, detail="Produto não encontrado")
        
        sessao.delete(produto_existente)
        sessao.commit()
        return {"detail": "Produto deletado com sucesso!"}
    
@router.get('/listar/{farmacia_id}')
def listar_produtos(farmacia_id: int):
    with Sessao() as sessao:
        produtos = sessao.query(Produto).filter(Produto.farmacia_id == farmacia_id).all()
        produtosFormat = []

        for produto in produtos:
            produtosFormat.append({
                'id': produto.id,
                'name': produto.nome,
                'price': str(produto.preco),
                'description': produto.descricao,
                'stock': produto.estoque,
            })
        return produtosFormat