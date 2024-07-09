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

class StudentSchema(Schema):
    id = fields.Str(required=True)
    email = fields.Email(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    role = fields.Str()
    date_birth = fields.Str()
    phone_number = fields.Str()
    media = fields.Str()
    teacherid = fields.Str()