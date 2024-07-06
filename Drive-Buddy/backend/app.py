import os
from dotenv import load_dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
from marshmallow import Schema, fields


app = Flask(__name__)

load_dotenv()
DATABASE_URL = os.getenv("MONGODB")

client = MongoClient(DATABASE_URL)
db = client["drive_buddy_db"]

courses_collection = db["courses"]
instructors_collection = db["instructors"]


class CourseSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str()
    instructor_id = fields.Str(required=True)

@app.route('/courses', methods=['POST'])
def create_course():
    course_data = request.get_json()
    course_schema = CourseSchema()

    try:
        validated_data = course_schema.load(course_data)

        courses_collection.insert_one(validated_data)
        return {'message': 'Course created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400

@app.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    course = courses_collection.find_one({"id": course_id})
    if course:
        return course
    else:
        return {'message': 'Course not found'}, 404

@app.route('/courses/<course_id>', methods=['PUT'])
def update_course(course_id):
    course_data = request.get_json()
    course_schema = CourseSchema()

    try:
        validated_data = course_schema.load(course_data)
        updated_course = courses_collection.find_one_and_update(
            {"id": course_id}, {"$set": validated_data})
        if updated_course:
            return {'message': 'Course updated successfully!'}
        else:
            return {'message': 'Course not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/courses/<course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = courses_collection.find_one_and_delete({"id": course_id})
    if course:
        return {'message': 'Course deleted successfully!'}
    else:
        return {'message': 'Course not found'}, 404



if __name__ == '__main__':
    app.run(debug=True)
