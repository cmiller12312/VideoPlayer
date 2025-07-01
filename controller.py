import DStools
import asyncio
import json
import backendHandler
import userStore

class controller:
    def __init__(self):
        self.instances = dict()
        self.instances["connection"] = backendHandler.connection("http://127.0.0.1:8000/")
        

            

    def run(self, data):
        type = data["type"]
        if type == "userPageRequest":
            pass

        elif type == "videoPageRequest":
            pass

        elif type=="loginPageRequest":
            results, message = self.instances["connection"].login({"username":data["username"], "password":data["password"]})

            data = {"type": "loginResponse", "value":results, "message":message}
            print(json.dumps(data), flush=True)
            if results:
                self.instances["userData"] = userStore.user(self.instances["connection"])
        elif type=="userPfpRequest":
            data = {"type": "userPfpResponse", "pfp":self.instances["userData"].getProfilePicture()}
            print(json.dumps(data), flush=True)

        elif type=="getVideoBatchRequest":
            results, titles = self.instances["connection"].getVideoBatch()
            data = {"type": "getVideoBatchResponse", "value":results, "titles": titles}
            print(json.dumps(data), flush=True)

        elif type=="addTagRequest":
            self.instances["connection"].addTag(data)
        elif type=="getTagsRequest":
            tags = self.instances["connection"].filters
            data = {"type": "getTagsResponse", "tags":tags}
            print(json.dumps(data), flush=True)
        elif type=="deleteTagRequest":
            self.instances["connection"].deleteTag(data)

        elif type=="saveSettingsRequest":
            self.instances["connection"].saveSettings(data)
            if data["pfp"] != None:
                self.instances["userData"].setProfilePicture()

        elif type=="signOutrequest":
            results, message = self.instances["connection"].signOut()
        elif type=="uploadVideoRequest":
            results, message = self.instances["connection"].uploadVideo(data)
        elif type =="signupRequest":
            results, message = self.instances["connection"].signUp(data)
            data = {"type": "signupResponse", "value":results, "message":message}
            print(json.dumps(data), flush=True)
            if results:
                self.instances["userData"] = userStore.user(self.instances["connection"])
        elif type =="searchRequest":
            results, message = self.instances["connection"].search(data)
            data = {"type": "searchResponse", "data": message}
            print(json.dumps(data), flush=True)

    

        return True