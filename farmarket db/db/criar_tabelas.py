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
    with Sessao() as db:
        farmacia = db.query(Farmacia).filter(Farmacia.id == 1).first()
        if not farmacia:
            db.add(Farmacia(nome='farmacia inicial', id=1))
            db.commit()