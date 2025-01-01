import React, { useEffect, useState } from 'react';
import './LipProductList.css'; 

const LipProductList = () => {
  const [lipProducts, setLipProducts] = useState([]);

  // API 호출하여 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:5000/api/lip-products')
      .then(response => response.json())
      .then(data => setLipProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="lip-product-list">
      <div className="product-grid">
        {lipProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <h3 className='product-shade_number'>{product.shade_number}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}원</p>
              <div className="tags">
                {JSON.parse(product.tags).map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <p className="product-season">{product.season}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LipProductList;
