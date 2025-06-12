import DStools
import asyncio
import json
import backendHandler

class controller:
    def __init__(self):
        self.instances = dict()
        self.instances["connection"] = backendHandler.connection("http://127.0.0.1:8000/")

            

    def run(self, data):
        type = data["type"]
        if type == "userPageRequest":
            pass

        if type == "videoPageRequest":
            pass

        if type=="videosPageRequest":
            pass

        if type=="loginPageRequest":
            results, message = self.instances["connection"].login({"username":data["username"], "password":data["password"]})

            data = {"type": "loginResponse", "value":results, "message":message}
            print(json.dumps(data), flush=True)