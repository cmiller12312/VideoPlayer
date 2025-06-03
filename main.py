import sys
import time
import json

def main():
        while(True):
            try:
                temp = input()
                jsonData = json.loads(temp)
                data = {"type": "userData", "value":jsonData["content"]}
                print(json.dumps(data), flush=True)
            except:
                sys.exit()
    

main()


