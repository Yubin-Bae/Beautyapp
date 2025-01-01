import React from 'react';
import { Link } from 'react-router-dom'; 

const Lips = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2>Lips</h2>
          <h3>Discover the perfect lip color to complete your personal style</h3>
          <h6>각 계절을 클릭하여 <strong>립 추천 페이지</strong>를 확인할 수 있습니다.</h6>
        </div>

        <div className="container mt-4">
          <div className="row row-cols-1 g-4">
            <div className="col">
              <div className="card">
                <div className="spring-grid">
                  <div className="spring-color" style={{ backgroundColor: "#FFD1B3" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#FFB6C1" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#FFA07A" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#F08080" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#F88379" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#FF69B4" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#FF6F61" }}></div>
                  <div className="spring-color" style={{ backgroundColor: "#FF4040" }}></div>
                </div>

                <div className="card-body">
                  <h5 className="personal-card">
                    <Link to="/lip-recommendation?season=spring" className="card-link"><strong>Spring</strong></Link>
                  </h5>
                  <p className="card-text">따뜻하고 밝은 색조</p>
                </div>
                <br />
                <p><strong>대표 립 색상</strong></p>

                <div className="color-lip-container">
                  <div className="color-lip-row">
                    <p className="fs-6">Coral Pink</p>
                    <div className="color-lip" style={{ backgroundColor: "#F88379" }}></div>
                  </div>

                  <div className="color-lip-row">
                    <p className="fs-6">Coral Red</p>
                    <div className="color-lip" style={{ backgroundColor: "#FF6F61" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="summer-grid">
                  <div className="summer-color" style={{ backgroundColor: "#FFB6C1" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#FF69B4" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#FF66CC" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#FF6F91" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#DB7093" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#C8A2C8" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#D473D4" }}></div>
                  <div className="summer-color" style={{ backgroundColor: "#E30B5D" }}></div>
                </div>

                <div className="card-body">
                  <h5 className="personal-card">
                    <Link to="/lip-recommendation?season=summer" className="card-link"><strong>Summer</strong></Link>
                  </h5>
                  <p className="card-text">차갑고 부드러운 색조</p>
                </div>
                <br />
                <p><strong>대표 립 색상</strong></p>

                <div className="color-lip-container">
                  <div className="color-lip-row">
                    <p className="fs-6">Rose Pink</p>
                    <div className="color-lip" style={{ backgroundColor: "#FF66CC" }}></div>
                  </div>

                  <div className="color-lip-row">
                    <p className="fs-6">Raspberry</p>
                    <div className="color-lip" style={{ backgroundColor: "#E30B5D" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="Autumn-grid">
                  <div className="Autumn-color" style={{ backgroundColor: "#FF8C00" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#FF7F50" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#FF6347" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#E97451" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#E2725B" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#D2691E" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#CB4154" }}></div>
                  <div className="Autumn-color" style={{ backgroundColor: "#9B2D30" }}></div>
                </div>

                <div className="card-body">
                  <h5 className="personal-card">
                    <Link to="/lip-recommendation?season=autumn" className="card-link"><strong>Autumn</strong></Link>
                  </h5>
                  <p className="card-text">따뜻하고 깊은 색조</p>
                </div>
                <br />
                <p><strong>대표 립 색상</strong></p>

                <div className="color-lip-container">
                  <div className="color-lip-row">
                    <p className="fs-6">Brick Red</p>
                    <div className="color-lip" style={{ backgroundColor: "#D2691E" }}></div>
                  </div>

                  <div className="color-lip-row">
                    <p className="fs-6">Red Plum</p>
                    <div className="color-lip" style={{ backgroundColor: "#CB4154" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card">
                <div className="Winter-grid">
                  <div className="Winter-color" style={{ backgroundColor: "#FF1493" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#FF0000" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#DC143C" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#990000" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#8B0000" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#800020" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#9B111E" }}></div>
                  <div className="Winter-color" style={{ backgroundColor: "#673147" }}></div>
                </div>

                <div className="card-body">
                  <h5 className="personal-card">
                    <Link to="/lip-recommendation?season=winter" className="card-link"><strong>Winter</strong></Link>
                  </h5>
                  <p className="card-text">차갑고 강렬한 색조</p>
                </div>
                <br />
                <p><strong>대표 립 색상</strong></p>

                <div className="color-lip-container">
                  <div className="color-lip-row">
                    <p className="fs-6">Burgundy</p>
                    <div className="color-lip" style={{ backgroundColor: "#800020" }}></div>
                  </div>

                  <div className="color-lip-row">
                    <p className="fs-6">Pure Red</p>
                    <div className="color-lip" style={{ backgroundColor: "#FF0000" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lips;
