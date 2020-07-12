from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests
from geotext import GeoText
import sys
import config
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

API_KEY = config.API_KEY

@app.route("/")
@cross_origin()
def home():
    return "Currently fetching data ..."

@app.route("/getClassic", methods = ['POST'])
@cross_origin()
def get_classic_resp():
    req_data = request.get_json()
    temp = req_data['temp']
    city = temp['msg']
    try:
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid={}&q={}&units=metric'.format(API_KEY, city)
        res = requests.get(url)
        data = res.json()
    except:
        return ("ERROR")
    return (data)

@app.route("/getReply", methods = ['POST'])
@cross_origin()
def get_response():
    req_data = request.get_json()
    temp = req_data['temp']
    city = temp['msg']
    places = GeoText(city)
    cities = list(places.cities)
    try:
        if (len(places.cities) > 1):
            return ("1 city by 1 city please")
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid={}&q={}&units=metric'.format(API_KEY, cities[0])
        res = requests.get(url)
        city_data = res.json()
    except:
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid={}&q={}&units=metric'.format(API_KEY, city)
        res = requests.get(url)
        city_data = res.json()
    return (city_data)

if __name__ == "__main__":
    app.run()