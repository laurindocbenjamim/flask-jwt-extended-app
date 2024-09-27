

class User(object):
    """
     User is an object with attributes
     Methods to create, update, delete and select user.
    """

    # Single list of dictionary with defa ult values
    users = [
            {"id": 1, "username": "email@test.com", "password": '1234', "name": "David Nicalson", "role": "user"},
            {"id": 2, "username": "email@test.com", "password": '1234', "name": "Marks Palm", "role": "admin"},
        ]
    
    def create(self,user):
        """ Method to create or insert user """
        if user:
            self.users.append(user)

    def update(self, id:int, user:dict):
        """ method to update the user data """
        return False

    def delete(self, id: int):
        """  Method to remove user """
        return False
    
    def get(self):
        return self.users
    
    def login(self, username, password):
        if not username:
            return "Username is required"
        elif not password:
            return "Password  is required"
        
        return next((user for user in self.get() if user['username'] == username and user['password'] == password), None)
        

       