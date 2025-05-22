class DItools:
    containers = dict()


    def createContainer(self, title):
        self.containers[title] = self.container()


    class container():
        def __init__(self):
            self.container = dict()

        

    class singleton():
        def __init__(self, object, *args, **kwargs):
            try:
                self.instance = object(kwargs)
            except:
                return False
        def deleteInstance(self):
            del self.instance

        def setInstance(self, object, *args, **kwargs):
            self.instance = object(kwargs)

    def addSingleton(self, container, title, object, *args, **kwargs ):
        
        try:
            temp = self.containers[container]
            temp[title] = self.singleton(object, kwargs)
        except:
            return False

