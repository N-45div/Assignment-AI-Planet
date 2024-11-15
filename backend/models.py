import os
from sqlalchemy import create_engine,Column,Integer,String,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



Base = declarative_base()

class PDFDocument(Base):
    __tablename__ = 'pdf_documents'
    id = Column(String,primary_key=True)
    title = Column(String,index=True)
    content = Column(Text,nullable = True)

engine = create_engine(os.environ.get("DATABASE_URL"))
SessionLocal = sessionmaker(autocommit = False, autoflush=False,bind=engine)
Base.metadata.create_all(bind = engine)
