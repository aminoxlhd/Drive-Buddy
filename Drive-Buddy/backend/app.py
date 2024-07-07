import os
import marshmallow
from dotenv import load_dotenv
from pymongo import MongoClient
from flask import Flask, request, jsonify
from models import  CourseSchema, CategorySchema

app = Flask(__name__)

load_dotenv()
DATABASE_URL = os.getenv("MONGODB")

client = MongoClient(DATABASE_URL, )
db = client["drive_buddy_db"]

courses_collection = db["courses"]
category_collection = db["category"]
instructors_collection = db["instructors"]




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
        course_schema = CourseSchema()
        course_dict = course_schema.dump(course)
        return course_dict

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

@app.route('/courses', methods=['GET'])
def get_all_courses():
    courses = list(courses_collection.find())
    course_list = []
    course_schema = CourseSchema()

    for course in courses:
        if course:
            course_dict = course_schema.dump(course)
            course_list.append(course_dict)

    return jsonify(course_list)


@app.route('/category', methods=['GET'])
def get_all_category():
    categorys = list(category_collection.find())
    category_list = []
    category_schema = CategorySchema()

    for category in categorys:
        if category:
            category_dict = category_schema.dump(category)
            category_list.append(category_dict)

    return jsonify(category_list)
@app.route('/category', methods=['POST'])
def create_category():
    category_data = request.get_json()
    category_schema = CategorySchema()
    try:
        validated_data = category_schema.load(category_data)
        category_collection.insert_one(validated_data)
        return {'message': 'Category created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/category/<category_id>', methods=['GET'])
def get_category(category_id):
    category = category_collection.find_one({"id": category_id})

    if category:
        category_schema = CategorySchema()
        category_dict = category_schema.dump(category)
        return category_dict

    else:
        return {'message': 'Category not found'}, 404


@app.route('/category/<category_id>', methods=['PUT'])
def update_category(category_id):
    category_data = request.get_json()
    category_schema = CategorySchema()

    try:
        validated_data = category_schema.load(category_data)
        updated_category = category_collection.find_one_and_update(
            {"id": category_id}, {"$set": validated_data})
        if updated_category:
            return {'message': 'Category updated successfully!'}
        else:
            return {'message': 'Category not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/category/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = category_collection.find_one_and_delete({"id": category_id})
    if category:
        return {'message': 'Category deleted successfully!'}
    else:
        return {'message': 'Category not found'}, 404

if __name__ == '__main__':
    app.run(debug=True)
