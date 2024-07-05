from flask import Flask

app = Flask(__name__)


@app.route('/')
def home():
    return 'Welcome to the Drive Buddy Driving School API!'

@app.route('/courses')
def get_courses():
    return {'courses': [{'name': 'Beginner Driving Course'}, {'name': 'Advanced Driving Course'}]}


if __name__ == '__main__':
    app.run(debug=True)
