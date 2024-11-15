from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import fitz
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from sqlalchemy.orm import Session
from models import PDFDocument, SessionLocal
from typing import Dict
from sqlalchemy.exc import IntegrityError

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
prompt = PromptTemplate(
    input_variables=["pdf_text", "question"],
    template="Based on the PDF content below:\n\n{pdf_text}\n\nAnswer this question: {question}",
)
chain = prompt | llm

class QuestionRequest(BaseModel):
    doc_id: str
    question: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    doc_id = file.filename  # Or some unique identifier based on the filename
    pdf_text = ""

    # Read PDF content
    with fitz.open(stream=await file.read(), filetype="pdf") as pdf_doc:
        for page_num in range(pdf_doc.page_count):
            page = pdf_doc[page_num]
            pdf_text += page.get_text()

    existing_doc = db.query(PDFDocument).filter(PDFDocument.id == doc_id).first()

    if existing_doc:
        # Update existing document
        existing_doc.content = pdf_text
        db.commit()
        db.refresh(existing_doc)
        return {"doc_id": existing_doc.id}
    else:
        # Insert a new document
        new_doc = PDFDocument(id=doc_id, content=pdf_text)
        db.add(new_doc)
        db.commit()
        db.refresh(new_doc)
        return {"doc_id": new_doc.id}

@app.post("/ask_question/")
async def ask_question(data: QuestionRequest, db: Session = Depends(get_db)):
    existing_doc = db.query(PDFDocument).filter(PDFDocument.id == data.doc_id).first()
    
    if not existing_doc:
        return {"error": "Document not found"}

    doc_text = existing_doc.content
    answer = chain.invoke({"pdf_text": doc_text, "question": data.question})

    # Make sure to return only the answer text
    return {"answer": answer.content if hasattr(answer, 'content') else str(answer)}



@app.get("/list_documents/")
def list_documents(db: Session = Depends(get_db)):
    documents = db.query(PDFDocument).all()
    return {"documents": [doc.id for doc in documents]}
