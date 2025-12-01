from .database import Sessao
from .models import Categoria, Produto, Farmacia
import json

def get_categorias():
    with Sessao() as sessao:
        categorias = sessao.query(Categoria).all()
    
    return categorias

def get_produtos():
    with Sessao() as sessao:
        produtos = (sessao.query(Produto)
            .join(Farmacia, Produto.farmacia_id == Farmacia.id))
        ...

