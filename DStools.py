class LinkedList():
    head = None
    tail = None
    size = 0 

    class node():
        def __init__(self, value):
            self.value = value
            self.next = None

        def getValue(self):
            return self.value
        
        def setValue(self, value):
            self.value = value

    def addNode(self, value):
        if self.head == None:
            self.head = self.node(value)
            self.tail = self.head
        else:
            self.tail.next = self.node(value)
        self.size+=1

    def pop(self):
        if self.head == None:
            return None
        else:
            temp = self.head
            self.head = self.head.next
            temp.next = None
            return temp
        
    def searchByIndex(self, index):
        temp = self.head
        for i in range(index):
            if i == index:
                return temp
            temp= temp.next

    def searchByValue(self, value):
        temp = self.head
        while temp != None:
            if temp.value == value:
                return temp
            temp = temp.next

    def deleteNode(self, index):
        node = self.searchByIndex(index - 1)
        temp = node.next.next
        node.next.next = None
        node.next = temp

    
        
