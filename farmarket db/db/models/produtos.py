from db.database import Base
from sqlalchemy import Column, ForeignKey, Integer, Float, String
from sqlalchemy.orm import Relationship

class Produto(Base):
    __tablename__ = 'Produtos'
    id = Column(Integer, primary_key=True)
    nome = Column(String(255), nullable=False)
    descricao = Column(String(500))
    preco = Column(Float, nullable=False)
    estoque = Column(Integer, nullable=False)
    imagem = Column(String(255))

    farmacia_id = Column(Integer, ForeignKey('Farmacias.id'), nullable=False)
    farmacia = Relationship('Farmacia', backref='produtos', lazy='subquery')