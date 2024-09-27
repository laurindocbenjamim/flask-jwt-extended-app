
import secrets
from flask import Flask, render_template, jsonify, request, current_app
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, create_refresh_token, jwt_required, get_jwt_identity

app = Flask(__name__)

app.config['SECRET_KEY']  = secrets.token_hex()

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 900 # Expires after 15 minutes
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 86400 # expires after 1 day


jwt = JWTManager(app)


from blocklist import BLOCKLIST

class User(object):
    users = [
            {"id": 1, "username": "email@test.com", "password": '1234', "name": "David Nicalson"},
            {"id": 2, "username": "email@test.com", "password": '1234', "name": "Marks Palm"},
        ]
    
    def create(self,user):
        if user:
            self.users.append(user)
    
    def get(self):
        return self.users
    
    def login(self, username, password):
        if not username:
            return "Username is required"
        elif not password:
            return "Password  is required"
        
        return next((user for user in self.get() if user['username'] == username and user['password'] == password), None)
        

            


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in BLOCKLIST

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return jsonify({"msg": "The token has been revoked"}), 401


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    access_token = ''        
    username = request.form.get('email', None)
    password = request.form.get('password', None)

    login = User().login(username=username, password=password)
    is_logged = True if login is not None else False
    if is_logged:
        access_token = create_access_token(identity=username)
    
    return jsonify({"is_logged": is_logged, "access_token": access_token, "user": login}), 401

# Logout method 
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    BLOCKLIST.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200


@app.route('/get-users')
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    return jsonify({'users': User().get(), 'current_user': current_user}), 200

"""@app.route('/refresh-token')
@jwt_required(refresh=True)
def refresh_jwt_token():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify({"new_access_token": new_token})"""

if __name__ == '__main__':
    app.run(debug=True, port=5500)







