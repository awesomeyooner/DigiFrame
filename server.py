from flask import *
from datetime import datetime
import os
import io

from PIL import Image

from util import string_formatter
import util.file_helper as file_helper

from display_api import DisplayType
import display_api

OK = 200
BAD_REQUEST = 400
NOT_FOUND = 404
INTERNAL_ERROR = 500

app = Flask(__name__)


# Serve the webpage
@app.route('/')
def main():
    return render_template("index.html")

# Handles when clients upload a picture
# Saves the image to the /image folder
@app.route('/upload', methods=['POST'])
def on_upload():

    # Just in case check if this is POST
    if request.method == 'POST':

        # Get the files in this POST
        files = request.files.getlist("file")

        # For every file in the files sent...
        for file in files:

            # Get the filename and FORCE ".png" extension
            filename = file_helper.change_file_extension(file.filename, ".png")

            # Get the formatted datetime
            datetime = string_formatter.get_datetime()

            file_path = os.path.join("images", datetime + " - " + filename)

            # Save the image to the images folder formatted
            file.save(file_path)

            # Convert to PIL Image
            image_file = Image.open(file)

            # Immediately load into memory
            image_file.load()

            display_api.display.update_image(image_file)

        return make_response("", OK)
    else:
        return make_response("", BAD_REQUEST)
    
@app.route('/message', methods=['POST'])
def handle_message():
    content = request.json
    
    message: str = content["message"]

    # if(len(message) == 0):
    #     print("fart")

    return make_response("", OK)

@app.route('/alive', methods=['GET'])
def handle_alive():
    if request.method == 'GET':
        return make_response("", OK)
    else:
        return make_response("", BAD_REQUEST)