from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import Relationship

class Categoria_produto(Base):
    __tablename__ = 'Categoria_produto'
    id = Column(Integer, primary_key=True)

    categoria_fk = Column(Integer, ForeignKey('Categorias.id'), nullable=False)
    produto_fk = Column(Integer, ForeignKey('Produtos.id'), nullable=False)