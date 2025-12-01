from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('sqlite:///farmarket db/db/dados.db')
Base = declarative_base()
Sessao = sessionmaker(bind=engine)