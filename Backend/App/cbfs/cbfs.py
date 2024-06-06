import os
import param
import requests
from config import *
from model import load_db

# Define the cbfs class and related functions
class cbfs(param.Parameterized):
    chat_history = param.List([])
    answer = param.String("")
    db_query  = param.String("")
    db_response = param.List([])
    
    def __init__(self, **params):
        super(cbfs, self).__init__( **params)
        self.loaded_folder = "./docs/Chat"
        self.qa = load_db(self.loaded_folder, "stuff", 4)
        self.chat_history = []
        self.answer = ""
        self.db_query = ""
        self.db_response = []

    def call_load_db(self, count):
        if count == 0 or file_input.value is None:
            return f"Loaded File: {self.loaded_file}"
        else:
            file_input.save("temp.pdf")
            self.loaded_file = file_input.filename
            self.qa = load_db("temp.pdf", "stuff", 4)
        self.clr_history()
        return f"Loaded File: {self.loaded_file}"

    def convchain(self, query, chat_history, qa):
        if not query:
             return {"User": "", "ChatBot": ""}

        result = qa({"question": query, "chat_history": chat_history})
        chat_history.extend([(query, result["answer"])])
        db_query = result["generated_question"]
        db_response = result["source_documents"]
        answer = result['answer']
    
        db_response_serializable = []
        for doc in db_response:
            doc_dict = {
            "title": doc.title if hasattr(doc, "title") else "Title not available",
            "page_content": doc.page_content if hasattr(doc, "page_content") else ""
        }
            db_response_serializable.append(doc_dict)

        return {
        "User": query,
        "ChatBot": answer,
        "db_query": db_query,
        "db_response": db_response_serializable,
        "db_responses": [doc.__dict__ for doc in db_response]
    }


    def clr_history(self, count=0):
        self.chat_history = []


cb = cbfs()