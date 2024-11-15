import os
from sqlalchemy import create_engine,Column,Integer,String,Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#we are here using Supabase based postgresql database for storing the metadata which can enhance the user experience to ask multiple questions
#we are using sqlalchemy library for the same and the schema design is shown in the PDFDocument class.


Base = declarative_base()

class PDFDocument(Base):
    __tablename__ = 'pdf_documents'
    id = Column(String,primary_key=True)
    title = Column(String,index=True)
    content = Column(Text,nullable = True)

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit = False, autoflush=False,bind=engine)
Base.metadata.create_all(bind = engine)
