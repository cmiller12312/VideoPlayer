class user():
    #class designed to store frequently needed user data so no request to server is needed
    def __init__(self, connection):
        self.connection = connection
        status, self.pfp = connection.getUserinfo()


    def setProfilePicture(self):
       status, self.pfp = self.connection.getUserinfo()

    def getProfilePicture(self):
        return self.pfp
    

    

