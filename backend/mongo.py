from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import hashlib
import uuid

uri = "mongodb+srv://crockrocks:crockrocks123@test.teczpyl.mongodb.net/?retryWrites=true&w=majority&appName=test"

client = MongoClient(uri, server_api=ServerApi('1'))
db = client.wsmartbuy_db
users_collection = db.users
preferences_collection = db.preferences

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def register_user(email, password):
    if users_collection.find_one({"email": email}):
        return False, "Email already registered"
    
    user_id = str(uuid.uuid4())
    user_doc = {
        "user_id": user_id,
        "email": email,
        "password": hash_password(password)
    }
    
    users_collection.insert_one(user_doc)
    return True, user_id

def authenticate_user(email, password):
    user = users_collection.find_one({"email": email})
    if not user:
        return False, "User not found"
    
    if user["password"] != hash_password(password):
        return False, "Invalid password"
    
    return True, user["user_id"]

def save_preferences(user_id, preferences_data):
    existing_preferences = preferences_collection.find_one({"user_id": user_id})
    
    if existing_preferences:
        preferences_collection.update_one(
            {"user_id": user_id},
            {"$set": preferences_data}
        )
    else:
        preferences_data["user_id"] = user_id
        preferences_collection.insert_one(preferences_data)
    
    return True

def get_preferences(user_id):
    preferences = preferences_collection.find_one({"user_id": user_id})
    if preferences:
        preferences.pop("_id", None)
    return preferences


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)