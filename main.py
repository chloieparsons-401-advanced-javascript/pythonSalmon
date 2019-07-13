from settings import NAME
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    print('Chloie:', Chloie)
    f"NAME: {NAME}"
    return render_template("hello.html", name=name)


@app.route('/sales')
def sales():
    return render_template("sales.html", total=42)