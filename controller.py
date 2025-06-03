import DItools
import DStools

class controller:
    def __init__(self):
        self.DItools = DItools.DItools()
        self.DItools.createContainer()

    def run(self, data):
        type = data["type"]
        if type == "userPageRequest":
            pass