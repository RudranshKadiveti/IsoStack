import io
from fastapi import UploadFile

def extract_text_from_upload(file: UploadFile) -> str:
    content = file.file.read()
    file.file.seek(0)
    
    filename = file.filename.lower() if file.filename else ""
    text = ""
    
    try:
        if filename.endswith(".pdf"):
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(content))
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        elif filename.endswith(".docx"):
            import docx
            doc = docx.Document(io.BytesIO(content))
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            # Assume text based (txt, json, md, etc)
            text = content.decode("utf-8", errors="replace")
    except Exception as e:
        err_msg = str(e)
        if len(err_msg) > 200: err_msg = err_msg[:200] + "..."
        print(f"Error extracting text from {filename}: {err_msg}")
        text = f"[Error extracting text from {filename}]"
        
    return text.strip()
