from db.database import Base
from sqlalchemy import Column, Integer, String

class Farmacia(Base):
    __tablename__ = 'Farmacias'
    id = Column(Integer, primary_key=True)
    nome = Column(String(255), nullable=False)