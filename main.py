import sys
import controller
import json
import asyncio

def main():
        connector = controller.controller()
        while(True):
            #Takes json data from main.js to call some function within the python modules.
            try:
                temp = input()
            except:
                sys.exit()
            jsonData = json.loads(temp)
            connector.run(jsonData)
            data = {"type": "userData", "value":jsonData["content"]}
            print(json.dumps(data), flush=True)

    


if __name__ == "__main__":
    main()


