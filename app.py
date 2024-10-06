from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pytesseract
from PIL import Image, ImageDraw, ImageFont
import os

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    image = request.files.get('image')
    text = request.form.get('text')

    image_text = pytesseract.image_to_string(Image.open(image)) if image else ''
    text_image = create_image_from_text(text) if text else None

    image_size = os.path.getsize(image.filename) if image else 0
    text_size = len(text.encode('utf-8')) if text else 0

    response = {
        'files': {
            'images': [image.filename] if image else [],
            'text': [image_text] if image_text else [text]
        },
        'sizes': {
            'image': image_size,
            'text': text_size
        }
    }

    return jsonify(response)

def create_image_from_text(text):
    font = ImageFont.load_default()
    size = font.getsize(text)
    image = Image.new('RGB', size, color=(255, 255, 255))
    draw = ImageDraw.Draw(image)
    draw.text((0, 0), text, fill=(0, 0, 0), font=font)
    image.save('text_image.png')
    return 'text_image.png'

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)