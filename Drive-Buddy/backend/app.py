from flask import Flask
from pymongo import MongoClient


app = Flask(__name__)


DATABASE_URL = "mongodb://localhost:5000/"

client = MongoClient(DATABASE_URL)
db = client["drive_buddy_db"]

courses_collection = db["courses"]
instructors_collection = db["instructors"]





@app.route('/courses', methods=['POST'])
def create_course():
    course_data = request.get_json()
    courses_collection.insert_one(course_data)
    return {'message': 'Course created successfully!'}

@app.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    course = courses_collection.find_one({"_id": ObjectId(course_id)})
    if course:
        return course
    else:
        return {'message': 'Course not found'}, 404




if __name__ == '__main__':
    app.run(debug=True)
