import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/fetchCode', methods=['GET'])
def home():
    return '''<h1> Hi</h1>'''

app.run()