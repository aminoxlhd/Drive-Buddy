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