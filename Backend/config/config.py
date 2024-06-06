import dotenv
import os
dotenv.load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
PERSIST_DIRECTORY = os.environ.get("PERSIST_DIRECTORY")
MODEL_NAME = os.environ.get("MODEL_NAME")
NODEJS_SERVER_URL = os.environ.get("NODEJS_SERVER_URL")
