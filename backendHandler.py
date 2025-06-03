import requests

class connection:
    def __init__(self, host, *args, **kwargs):
        self.host = host

    def post(self, data):
        request = requests.post(url=self.host, json=data)
        


if __name__ == "__main__":
    print("testing")
    connection("http://127.0.0.1:8000/signup/").post({"username":"user1", "password":"password"})