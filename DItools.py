class DItools:
    
    def createContainer(self):
        self.container = dict()
        return self.container

    
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

    def addSingleton(self, title, object, *args, **kwargs ):
        
        try:
            temp = self.container
            temp[title] = self.singleton(object, kwargs)
        except:
            return False

