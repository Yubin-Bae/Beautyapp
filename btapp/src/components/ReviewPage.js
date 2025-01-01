import { useEffect, useState } from "react";
import './ReviewList.css';
import StarRating from './StarRating.js';

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);

    // 초기 리뷰 데이터를 가져오는 GET 요청
    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Error fetching reviews:", error));
    }, []);

    // 리뷰 추가를 위한 POST 요청
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: newReview, rating: rating })
        })
        .then(response => response.json())
        .then(() => {
            fetch("http://localhost:5000/reviews")
                .then(response => response.json())
                .then(data => setReviews(data))
                .catch(error => console.error("Error fetching reviews:", error));

            setNewReview("");
            setRating(0);
        })
        .catch(error => console.error("Error posting review:", error));
    };

    // 리뷰 삭제를 위한 DELETE 요청
    const deleteReview = (id) => {
        fetch(`http://localhost:5000/reviews/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            setReviews(reviews.filter(review => review.id !== id)); // 상태 업데이트로 삭제 반영
        })
        .catch(error => console.error("Error deleting review:", error));
    };

    return (
        <div className="reviewContainer">
            <h2 className="reviewTitle"><strong>Review</strong></h2>
            <div className="reviewList">
                {reviews.map((review) => (
                    <div key={review.id} className="reviewItem">
                        <p>{review.content}</p>
                        <div className="rating-delete">
                            <p>별점: {review.rating} / 5</p>
                            <button onClick={() => deleteReview(review.id)} className="delete-btn">삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="addReview">
                <textarea
                    className="Review-box"
                    name="Review"
                    rows="3"
                    placeholder="리뷰를 작성해주세요."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    required
                ></textarea>
                <StarRating setRating={setRating} rating={rating} />
                <button onClick={handleSubmit} className="Review-btn">작성하기</button>
            </div>
        </div>
    );
}

export default ReviewList;
