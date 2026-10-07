from flask import Flask,render_template,url_for
import sys
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
	return "Welcome World"

@app.route("/posts")
def posts():
	data = {"username": "TD","role":"Admin", "posts":["Post1","Post2","Post3"]}
	return data

if __name__=='__main__':
	print("Running")
	sys.stdout.flush()
	app.run(port=4000,debug=False)