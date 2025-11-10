from .models import Farmacia, Produto, Categoria, Categoria_produto
from db.database import engine, Base, Sessao

Base.metadata.create_all(bind=engine)

def add_categorias():
    categorias = ['higiene', 'medicamentos', 'vitaminas']

    with Sessao() as sessao:
        for categoria in categorias:
            sessao.add(Categoria(nome=categoria))
        sessao.commit()

def add_farmacias():
    ...

def add_produtos():
    ...

# adicionar_categorias()