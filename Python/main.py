from fastapi import FastAPI
from langchain_community.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain, SimpleSequentialChain, SequentialChain
from langchain.prompts import PromptTemplate
from fastapi.middleware.cors import CORSMiddleware
#from dotenv import load_dotenv
from key import huggingface_access_key
import os
from langchain.prompts import FewShotPromptTemplate

os.environ["HUGGINGFACEHUB_API_TOKEN"] = huggingface_access_key



# load_dotenv()
# huggingface_access_key = os.getenv("HUGGINGFACE_ACCESS_KEY")

repo_id = "mistralai/Mistral-7B-Instruct-v0.3"


llm = HuggingFaceEndpoint(
    repo_id=repo_id, temperature=0.2, token= huggingface_access_key
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# @app.get("/{genre}/{language}")
@app.get("/{query}")


def read_root(query):
    prompt_template_name = PromptTemplate(
    input_variables=["query"],
    template="How to make {query} dish?",
    )
    chain1 = LLMChain(llm=llm, prompt=prompt_template_name)

    result1 = chain1.run(query)
    return result1

#print(read_root("pasta"))