from DStools import LinkedList

class event():
    def __init__(self, type, message):
        self.type = type
        self.message = message

class eventQueue():
    def __init__(self):
        self.eventQueue = LinkedList()

    def addItem(self, event):
        self.eventQueue.addNode(event)

    def popItem(self):
        return self.eventQueue.pop()
    