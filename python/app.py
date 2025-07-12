from flask import *
from datetime import datetime
import os

OK = 200
BAD_REQUEST = 400
NOT_FOUND = 404
INTERNAL_ERROR = 500

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        files = request.files.getlist("file")

        for file in files:
            filename = file.filename
            datetime = get_datetime(with_micros=False)
            extension = ".png" #get_file_extension(file.filename)

            file.save(os.path.join("images", datetime + extension + " - " + filename))

        return make_response("", OK)
    else:
        return make_response("", BAD_REQUEST)

@app.route('/alive', methods=['GET'])
def handle_alive():
    if request.method == 'GET':
        return make_response("", OK)
    else:
        return make_response("", BAD_REQUEST)

def get_datetime(unit_seperator="-", gap="_", with_micros=True):
    current = datetime.now()

    year = str(current.year)
    month = str(current.month) if current.month % 10 != current.month else "0" + str(current.month) 
    day = str(current.day) if current.day % 10 != current.day else "0" + str(current.day)
    hour = str(current.hour) if current.hour % 10 != current.hour else "0" + str(current.hour)

    minute = str(current.minute) if current.minute % 10 != current.minute else "0" + str(current.minute)
    second = str(current.second) if current.second % 10 != current.second else "0" + str(current.second)
    microsecond = str(current.microsecond)

    date = year + unit_seperator + month + unit_seperator + day
    time = hour + unit_seperator + minute + unit_seperator + second + ("." + microsecond if with_micros else "")

    return date + gap + time

def get_file_extension(filename: str):
    dot_pos = filename.find(".")

    if dot_pos == -1:
        return None
    
    extension = filename[dot_pos:]

    return extension

if __name__ == '__main__':
    print(get_datetime())
    app.run(host='0.0.0.0', port=8000)