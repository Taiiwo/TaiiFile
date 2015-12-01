import pymongo
import hashlib
import json
from bson.objectid import ObjectId
from bson import json_util

def register(req, user, passw, details=False):
    details = json.loads(details) if details else False
    # Get the users collection
    users = getColl('users')
    # construct user model
    userData = {
        "user": user,
        "passw": sha512(user + passw),# This is an effective salt.
        "details": details
    }
    # Make sure user is not already registered
    if users.find({"user": user}).count() > 0:
        return "userTaken"
    # validate the username and password
    elif len(user) < 140 and len(passw) >= 6 and len(passw) < 140:
        # insert the user into the database and return their id
        users.insert(userData)
        # log the user in
        return login(req, user, passw)
    else:
        # Only broken clients will recieve this error
        return "error"

def login(req, user, passw):
    # get user collection
    db = getColl('users')
    # find the user in the collection
    userD = db.find_one({"user": user})
    if userD and userD['passw'] == sha512(user + passw):
        userID = str(userD['_id'])
        passw = userD['passw']
        del userD['_id']# delete sensitive variables
        del userD['passw']# ^^^^^^^^^^^^^^^^^^^^^^^^
        # User logged in. Gibbe (session) cookies
        return json.dumps({
            "session": sha512(userID + passw),
            "userID": userID,
            "details": userD
        })
    else:
        return False

### Here starts the auth-only functions. Make sure you check their session cookies!



### Here ends the auth-only functions. Make sure you check their session cookies!


### Private util functions
def sha512(string):# shorthand for SHA512-hashing a string
    return hashlib.sha512(string).hexdigest()

def getColl(name):# Gets a collection from mongo-db
    client = pymongo.MongoClient('localhost', 27017)
    db = client.recruitment
    return db[name]

def auth(userID, session):
    # get user deets
    db = getColl('users')
    # find user in db
    user = db.find_one({'_id': ObjectId(userID)})
    # check if the session is legit
    if user and session == sha512(str(user['_id']) + user['passw']):
        return True
    else:
        return False
