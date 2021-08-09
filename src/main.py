import pymysql
from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.datasets import imdb
from keras.preprocessing import sequence
from keras.models import load_model
import keras
import numpy as np

db = pymysql.connect(host='localhost', user='root', password="your_password", db='your_db')
cursor = db.cursor()

app = Flask(__name__)
CORS(app, resources=r'/*')


@app.route('/login/add', methods=['GET'])
def login_add():
    if request.method == "GET":
        username = request.values.get("username")
        password = request.values.get("password")
        try:
            sql = "INSERT INTO Login(username, password) VALUES(%s, %s)"
            var = (str(username), str(password))
            cursor.execute(sql, var)
            db.commit()
            print("add a new user success:" + str(username))
            return "1"
        except Exception as e:
            print("add a new user failed", e)
            db.rollback()
            return "-1"


@app.route('/login/login', methods=['GET'])
def login_login():
    if request.method == "GET":
        username = request.values.get("username")
        password = request.values.get("password")

        cursor.execute("SELECT username FROM Login WHERE username = \""+str(username)
                       + "\" AND password = \""+str(password)+"\"")
        data = cursor.fetchone()
        if (data is not None):
            print("result:", data)
            jsondata = {"username": str(data[0])}
            return jsonify(jsondata)
        else:
            print("result: NULL")
            jsondata = {}
            return jsonify(jsondata)


@app.route('/login/diary/add', methods=['GET'])
def diary_add():
    if request.method == "GET":
        username = request.values.get("username")
        content = request.values.get("content")
        score = request.values.get("score")
        try:
            cursor.execute("call addDiary(\""+str(username)+"\",\""+str(content)+"\", score)")
            db.commit()
            print("add diary success")
            return "1"
        except Exception as e:
            print("add a new diary failed", e)
            db.rollback()
            return "-1"


@app.route('/login/diary/show', methods=['GET'])
def diary_show():
    if request.method == "GET":
        username = request.values.get("username")
        content = request.values.get("content")
        cursor.execute("SELECT * FROM Diary WHERE username = \""+str(username)+"\"")
        data = cursor.fetchall()
        temp = {}
        result = []
        if (data != None):
            for i in data:
                temp["username"] = i[0]
                temp["content"] = i[1]
                temp["content_id"] = i[2]
                temp["time"] = i[3]
                result.append(temp.copy())
            print("result: ", len(data))
            return jsonify(result)
        else:
            print("result: NULL")
            return jsonify([])


model = load_model(path='model.h5')
word_index = imdb.get_word_index()
MAXLEN = 250  # max lenth of the review


def encode_text(text):
    tokens = keras.preprocessing.text.text_to_word_sequence(text)
    tokens = [word_index[word] if word in word_index else 0 for word in tokens]
    return sequence.pad_sequences([tokens], MAXLEN)[0]


reverse_word_index = {value: key for (key, value) in word_index.items()}


def decode_integers(integers):
    PAD = 0
    text = ""
    for num in integers:
        if num != PAD:
            text += reverse_word_index[num] + " "

    return text[:-1]


def predict(text):
    encoded_text = encode_text(text)
    pred = np.zeros((1, MAXLEN))
    pred[0] = encoded_text
    result = model.predict(pred).item()
    return result


@app.route('/login/diary/score', methods=['GET'])
def diary_score():
    if request.method == "GET":
        content = request.values.get("content")
        result = predict(content)
        score = round(result * 100)
        print(f'{score=}')
        # jsondata = {"score":str(result[0])}
        # return jsonify(jsondata)
        return str(score)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
    db.close()
    print("Goodbye")
