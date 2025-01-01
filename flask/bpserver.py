from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 데이터베이스 연결 설정
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='0619',
        database='btapp'
    )

@app.route('/reviews', methods=['GET'])
def get_reviews():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM reviews")
    results = cursor.fetchall()
    reviews = [{"id": r[0], "content": r[1], "rating": r[2]} for r in results]  # rating도 포함합니다.
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

# DELETE 요청 처리
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

if __name__ == '__main__':
    app.run(debug=True)
