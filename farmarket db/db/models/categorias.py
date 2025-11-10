from db.database import Base
from sqlalchemy import Column, Integer, String

class Categoria(Base):
    __tablename__ = 'Categorias'
    id = Column(Integer, primary_key=True)
    nome = Column(String(255), nullable=False)