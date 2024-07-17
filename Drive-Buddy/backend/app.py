import os
import marshmallow
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, JWTManager, create_access_token, get_jwt_identity
from pymongo import MongoClient
from flask import Flask, request, jsonify
from models import CourseSchema, CategorySchema, StudentSchema, TeacherSchema, VehiculeSchema, MediaSchema, \
    PurchaseSchema
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = "Fvx5pWKDaR20YcA1l30"
app.config['JWT_SECURITY_KEY'] = "Fvx5pWKDaR20YcA1l30"
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

load_dotenv()
DATABASE_URL = os.getenv("MONGODB")

client = MongoClient(DATABASE_URL, )
db = client["drive_buddy_db"]

courses_collection = db["courses"]
category_collection = db["category"]
instructors_collection = db["instructors"]
student_collection = db["student"]
teacher_collection = db["teacher"]
vehicule_collection = db["vehicule"]
media_collection = db["media"]
purchase_collection = db["purchase"]


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


##############


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


##############


@app.route('/student', methods=['GET'])
def get_all_student():
    students = list(student_collection.find())
    student_list = []
    student_schema = StudentSchema()

    for student in students:
        if student:
            student_dict = student_schema.dump(student)
            student_list.append(student_dict)

    return jsonify(student_list)


@app.route('/student', methods=['POST'])
def create_student():
    student_data = request.get_json()
    student_schema = StudentSchema()
    try:
        validated_data = student_schema.load(student_data)
        user_password = validated_data.get('password')
        hashed_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
        validated_data['password'] = hashed_password
        student_collection.insert_one(validated_data)
        return {'message': 'Student created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/student/<student_id>', methods=['GET'])
def get_student(student_id):
    student = student_collection.find_one({"id": student_id})

    if student:
        student_schema = StudentSchema()
        student_dict = student_schema.dump(student)
        return student_dict

    else:
        return {'message': 'Student not found'}, 404


@app.route('/student/<student_id>', methods=['PUT'])
def update_student(student_id):
    student_data = request.get_json()
    student_schema = StudentSchema()

    try:
        validated_data = student_schema.load(student_data)
        student_category = student_collection.find_one_and_update(
            {"id": student_id}, {"$set": validated_data})
        if student_category:
            return {'message': 'Student updated successfully!'}
        else:
            return {'message': 'Student not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/student/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = student_collection.find_one_and_delete({"id": student_id})
    if student:
        return {'message': 'Student deleted successfully!'}
    else:
        return {'message': 'Student not found'}, 404


##############


@app.route('/teacher', methods=['GET'])
def get_all_teacher():
    teachers = list(teacher_collection.find())
    teacher_list = []
    teacher_schema = TeacherSchema()

    for teacher in teachers:
        if teacher:
            teacher_dict = teacher_schema.dump(teacher)
            teacher_list.append(teacher_dict)

    return jsonify(teacher_list)


@app.route('/teacher', methods=['POST'])
def create_teacher():
    teacher_data = request.get_json()
    teacher_schema = TeacherSchema()
    try:
        validated_data = teacher_schema.load(teacher_data)
        user_password = validated_data.get('password')
        hashed_password = bcrypt.generate_password_hash(user_password).decode('utf-8')
        validated_data['password'] = hashed_password
        teacher_collection.insert_one(validated_data)
        return {'message': 'Teacher created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/teacher/<teacher_id>', methods=['GET'])
def get_teacher(teacher_id):
    teacher = teacher_collection.find_one({"id": teacher_id})

    if teacher:
        teacher_schema = TeacherSchema()
        teacher_dict = teacher_schema.dump(teacher)
        return teacher_dict

    else:
        return {'message': 'Teacher not found'}, 404


@app.route('/teacher/<teacher_id>', methods=['PUT'])
def update_teacher(teacher_id):
    teacher_data = request.get_json()
    teacher_schema = TeacherSchema()

    try:
        validated_data = teacher_schema.load(teacher_data)
        teacher_category = teacher_collection.find_one_and_update(
            {"id": teacher_id}, {"$set": validated_data})
        if teacher_category:
            return {'message': 'Teacher updated successfully!'}
        else:
            return {'message': 'Teacher not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/teacher/<teacher_id>', methods=['DELETE'])
def delete_teacher(teacher_id):
    teacher = teacher_collection.find_one_and_delete({"id": teacher_id})
    if teacher:
        return {'message': 'Teacher deleted successfully!'}
    else:
        return {'message': 'Teacher not found'}, 404


#############


@app.route('/vehicule', methods=['GET'])
#@jwt_required()
def get_all_vehicule():
    #username = get_jwt_identity()
    #print(username)
    vehicules = list(vehicule_collection.find())
    vehicule_list = []
    vehicule_schema = VehiculeSchema()

    for vehicule in vehicules:
        if vehicule:
            vehicule_dict = vehicule_schema.dump(vehicule)
            vehicule_list.append(vehicule_dict)

    return jsonify(vehicule_list)


@app.route('/vehicule', methods=['POST'])
def create_vehicule():
    vehicule_data = request.get_json()
    vehicule_schema = VehiculeSchema()
    try:
        validated_data = vehicule_schema.load(vehicule_data)
        vehicule_collection.insert_one(validated_data)
        return {'message': 'Vehicule created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/vehicule/<vehicule_id>', methods=['GET'])
def get_vehicule(vehicule_id):
    vehicule = vehicule_collection.find_one({"id": vehicule_id})

    if vehicule:
        vehicule_schema = VehiculeSchema()
        vehicule_dict = vehicule_schema.dump(vehicule)
        return vehicule_dict

    else:
        return {'message': 'Vehicule not found'}, 404


@app.route('/vehicule/<vehicule_id>', methods=['PUT'])
def update_vehicule(vehicule_id):
    vehicule_data = request.get_json()
    vehicule_schema = VehiculeSchema()

    try:
        validated_data = vehicule_schema.load(vehicule_data)
        vehicule_category = vehicule_collection.find_one_and_update(
            {"id": vehicule_id}, {"$set": validated_data})
        if vehicule_category:
            return {'message': 'Vehicule updated successfully!'}
        else:
            return {'message': 'Vehicule not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/vehicule/<vehicule_id>', methods=['DELETE'])
def delete_vehicule(vehicule_id):
    vehicule = vehicule_collection.find_one_and_delete({"id": vehicule_id})
    if vehicule:
        return {'message': 'Vehicule deleted successfully!'}
    else:
        return {'message': 'Vehicule not found'}, 404


#############


@app.route('/media', methods=['GET'])
def get_all_media():
    medias = list(media_collection.find())
    media_list = []
    media_schema = MediaSchema()

    for media in medias:
        if media:
            media_dict = media_schema.dump(media)
            media_list.append(media_dict)

    return jsonify(media_list)


@app.route('/media', methods=['POST'])
def create_media():
    media_data = request.get_json()
    media_schema = MediaSchema()
    try:
        media_data = media_schema.load(media_data)
        media_collection.insert_one(media_data)
        return {'message': 'Media created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/media/<media_id>', methods=['GET'])
def get_media(media_id):
    media = media_collection.find_one({"id": media_id})

    if media:
        media_schema = MediaSchema()
        media_dict = media_schema.dump(media)
        return media_dict

    else:
        return {'message': 'Media not found'}, 404


@app.route('/media/<media_id>', methods=['PUT'])
def update_media(media_id):
    media_data = request.get_json()
    media_schema = MediaSchema()

    try:
        validated_data = media_schema.load(media_data)
        media_category = media_collection.find_one_and_update(
            {"id": media_id}, {"$set": validated_data})
        if media_category:
            return {'message': 'Media updated successfully!'}
        else:
            return {'message': 'Media not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/media/<media_id>', methods=['DELETE'])
def delete_media(media_id):
    media = media_collection.find_one_and_delete({"id": media_id})
    if media:
        return {'message': 'Media deleted successfully!'}
    else:
        return {'message': 'Media not found'}, 404


#############


@app.route('/purchase', methods=['GET'])
def get_all_purchase():
    purchases = list(purchase_collection.find())
    purchase_list = []
    purchase_schema = PurchaseSchema()

    for purchase in purchases:
        if purchase:
            purchase_dict = purchase_schema.dump(purchase)
            purchase_list.append(purchase_dict)

    return jsonify(purchase_list)


@app.route('/purchase', methods=['POST'])
def create_purchase():
    purchase_data = request.get_json()
    purchase_schema = PurchaseSchema()
    try:
        purchase_data = purchase_schema.load(purchase_data)
        purchase_collection.insert_one(purchase_data)
        return {'message': 'Purchase created successfully!'}
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/purchase/<purchase_id>', methods=['GET'])
def get_purchase(purchase_id):
    purchase = purchase_collection.find_one({"id": purchase_id})

    if purchase:
        purchase_schema = PurchaseSchema()
        purchase_dict = purchase_schema.dump(purchase)
        return purchase_dict

    else:
        return {'message': 'Purchase not found'}, 404

@app.route('/purchase_user/<user_id>', methods=['GET'])
def get_purchase_by_user(user_id):
    purchase = purchase_collection.find({"studentId": user_id})

    if purchase:
        purchase_schema = PurchaseSchema(many=True)
        purchase_dict = purchase_schema.dump(purchase)
        return purchase_dict

    else:
        return {'message': 'Purchase not found'}, 404


@app.route('/purchase/<purchase_id>', methods=['PUT'])
def update_purchase(purchase_id):
    purchase_data = request.get_json()
    purchase_schema = PurchaseSchema()

    try:
        validated_data = purchase_schema.load(purchase_data)
        purchase_category = purchase_collection.find_one_and_update(
            {"id": purchase_id}, {"$set": validated_data})
        if purchase_category:
            return {'message': 'Purchase updated successfully!'}
        else:
            return {'message': 'Purchase not found'}, 404
    except marshmallow.ValidationError as err:
        return jsonify({'errors': err.messages}), 400


@app.route('/purchase/<purchase_id>', methods=['DELETE'])
def delete_purchase(purchase_id):
    purchase = purchase_collection.find_one_and_delete({"id": purchase_id})
    if purchase:
        return {'message': 'Purchase deleted successfully!'}
    else:
        return {'message': 'Purchase not found'}, 404


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    type = data['type']
    if type == 'student':
        user = student_collection.find_one({"email": email})
    else:
        user = teacher_collection.find_one({"email": email})

    if user and bcrypt.check_password_hash(user.get('password'), password):
        access_token = create_access_token(identity=user.get('id'))
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401


if __name__ == '__main__':
    app.run(debug=True)
