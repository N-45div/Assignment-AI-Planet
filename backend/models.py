import os
from sqlalchemy import create_engine,Column,Integer,String,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()


Base = declarative_base()

class PDFDocument(Base):
    __tablename__ = 'pdf_documents'
    id = Column(String,primary_key=True)
    title = Column(String,index=True)
    content = Column(Text,nullable = True)

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit = False, autoflush=False,bind=engine)
Base.metadata.create_all(bind = engine)
