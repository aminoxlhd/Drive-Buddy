from marshmallow import Schema, fields


class CourseSchema(Schema):
    id = fields.Str()
    title = fields.Str()
    category = fields.Str()
    content = fields.Str()


class CategorySchema(Schema):
    id = fields.Str()
    title = fields.Str()
    content = fields.Str()


class TeacherSchema(Schema):
    id = fields.Str(required=True)
    adreess = fields.Str()
    vehiculeid = fields.Str()
    permis = fields.Str()
    availibiltiy = fields.Str()
    student_id = fields.Str()
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    role = fields.Str()
    date_birth = fields.Str()
    phone_number = fields.Str()
    media = fields.Str()


class StudentSchema(Schema):
    id = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    role = fields.Str()
    date_birth = fields.Str()
    phone_number = fields.Str()
    media = fields.Str()
    teacherid = fields.Str()


class VehiculeSchema(Schema):
    id = fields.Str()
    teacherid = fields.Str()
    category = fields.Str()
    module = fields.Str()
    gearbox = fields.Str()
    price = fields.Str()


class MediaSchema(Schema):
    id = fields.Str()
    photo = fields.Str()
    permis = fields.Str()


class PurchaseSchema(Schema):
    id = fields.Str()
    studentid = fields.Str()
    teacherid = fields.Str()
    cateegory = fields.Str()
    price = fields.Str()
    date = fields.Str()
