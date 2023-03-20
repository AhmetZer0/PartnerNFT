import requests
import json
import ast
import time

def req():

    collections = requests.get("https://api.howrare.is/v0.1/collections")
    collection = collections.json()
    collection = str(collection)
    collection = json.dumps(ast.literal_eval(collection))

    with open("collection.json","w") as file:
        file.write(collection)

    print("We write collection to corresponding file...")
  



if __name__ == "__main__":
    
    print("We are requesting collection information")
    req()
    
