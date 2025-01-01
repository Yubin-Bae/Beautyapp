import sys
import os
from flask import Flask, request, jsonify, send_from_directory
import cv2
import dlib
import numpy as np
from flask_cors import CORS, cross_origin
import mysql.connector

sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))
from src.personal_color_analysis.personal_color import analysis

app = Flask(__name__)
CORS(app)

# MySQL 데이터베이스 연결 설정
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='0619',
        database='btapp'
    )

#-------------------------------------------------#
#----------------personal_color-------------------#
#-------------------------------------------------#

# 퍼스널 컬러 분석 API
@app.route('/analyze', methods=['POST'])
@cross_origin()
def analyze_personal_color():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    try:
        result = analysis(file_path)
        os.remove(file_path)

        tone = result['tone']
        metrics = result['metrics']

        print(f"분석 완료: {tone}")
        return jsonify({'colorType': tone, 'metrics': metrics})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#-------------------------------------------------#
#----------------- LIP_Makeup --------------------#
#-------------------------------------------------#

# 얼굴 검출기와 랜드마크 모델 불러오기
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(os.path.abspath("shape_predictor_68_face_landmarks.dat"))

def apply_lipstick(image_path, color):
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    for face in faces:
        landmarks = predictor(gray, face)
        lip_points = [(landmarks.part(i).x, landmarks.part(i).y) for i in range(48, 61)]

        mask = np.zeros_like(gray)
        points = np.array(lip_points, dtype=np.int32)
        cv2.fillPoly(mask, [points], 255)

        if color.startswith('#') and len(color) == 7:
            try:
                lip_color = tuple(int(color[i:i+2], 16) for i in (5, 3, 1))
            except ValueError:
                raise ValueError(f"Invalid color format: {color}")
        else:
            raise ValueError(f"Invalid color format: {color}")

        colored_lips = np.copy(image)
        colored_lips[mask == 255] = lip_color

        alpha = 0.3
        blended = cv2.addWeighted(image, 1 - alpha, colored_lips, alpha, 0)

        result_path = "static/result.jpg"
        cv2.imwrite(result_path, blended)

        return result_path

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    color = request.form.get('color', '#FFFFFF')
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    try:
        result_image_path = apply_lipstick(file_path, color)
        return jsonify({'result': f'/static/{os.path.basename(result_image_path)}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/static/<path:filename>')
@cross_origin()
def serve_static(filename):
    return send_from_directory('static', filename)

#-------------------------------------------------#
#----------------MySQL Review API-----------------#
#-------------------------------------------------#

@app.route('/reviews', methods=['GET'])
def get_reviews():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM reviews")
    results = cursor.fetchall()
    reviews = [{"id": r[0], "content": r[1], "rating": r[2]} for r in results]
    cursor.close()
    connection.close()
    return jsonify(reviews)

@app.route('/reviews', methods=['POST'])
def post_reviews():
    data = request.get_json()
    content = data.get("content")
    rating = data.get("rating", 0)

    if not content:
        return jsonify({"error": "Content is required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO reviews (content, rating) VALUES (%s, %s)", (content, rating))
    connection.commit()
    cursor.close()
    connection.close()
    
    return jsonify({"content": content, "rating": rating}), 201

@app.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM reviews WHERE id = %s", (id,))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "리뷰가 삭제되었습니다"}), 200

@app.route('/api/lip-products', methods=['GET'])
def get_lip_products():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM lip_products')
    lip_products = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(lip_products)

@app.route('/')
@cross_origin()
def index():
    return 'Welcome to the Personal Color and Review API!'

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    if not os.path.exists('static'):
        os.makedirs('static')
    app.run(debug=True)
