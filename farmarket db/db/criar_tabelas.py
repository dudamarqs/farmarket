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
    farmacias = [
        {'nome': 'Drogall', 'imagem': '.'},
        {'nome': 'PagueMenos', 'imagem': '.'},
        {'nome': 'Drogasil', 'imagem': '.'},
        {'nome': 'Drogaria Rosário', 'imagem': '.'}
    ]

    with Sessao() as sessao:
        for farmacia in farmacias:
            sessao.add(Farmacia(nome=farmacia['nome'], imagem=farmacia['imagem']))
        sessao.commit()

def add_produtos():
    produtos = [
        {'nome': 'Sabonete íntimo Nivea 250ml', 'preco': 22.9, 'imagem': '...', 'farmacia': 'Drogasil'},
        {'nome': 'Shampoo e Cond. Elseve', 'preco': 22.9, 'imagem': '...', 'farmacia': 'Drogaria Rosário'},
        {'nome': 'Kit escova de dente Condor', 'preco': 8.5, 'imagem': '...', 'farmacia': 'PagueMenos'},
        {'nome': 'Espuma de Barbear Bozzano', 'preco': 13.99, 'imagem': '...', 'farmacia': 'Drogall'},
        {'nome': 'Buscopan Ibup. 400mg 20 und', 'preco': 22.90, 'imagem': '../assets/images/produtos/buscofem.webp', 'farmacia': 'Drogall'},
        {'nome': 'Advil', 'preco': 18.50, 'imagem': '../assets/images/produtos/advil.png', 'farmacia': 'Drogaria Rosário'},
        {'nome': 'Neosaldina', 'preco': 15.00, 'imagem': '../assets/images/produtos/neosaldina.webp', 'farmacia': 'PagueMenos'},
        {'nome': 'Dorflex', 'preco': 11.99, 'imagem': '../assets/images/produtos/dorflex.jpg', 'farmacia': 'Drogasil'},
        {'nome': 'Vitamina C Redoxon 30cp', 'preco': 35.00, 'imagem': '../assets/images/img.png', 'farmacia': 'Drogall'},
        {'nome': 'Complexo B + Zinco', 'preco': 45.00, 'imagem': '../assets/images/img.png', 'farmacia': 'PagueMenos'},
    ]
    
    farmacias = {"Drogall": 'Drogall', 'Drogasil': 'Dragasil', 'Drogaria Rosário': 'Drogaria Rosário', 'PagueMenos': 'PagueMenos'}
    
    with Sessao() as sessao:
        farmacias = sessao.query(Farmacia).all()
        for produto in produtos:
            id_farmacia = [farmacia.id for farmacia in farmacias if farmacia.nome == produto['farmacia']]
            print(id_farmacia)
            sessao.add(Produto(nome=produto['nome'], preco=produto['preco'], imagem=produto['imagem'], farmacia_id=id_farmacia[0]))
            
        sessao.commit()
        
def add_produto_categoria():
    ...