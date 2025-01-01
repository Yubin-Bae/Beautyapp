import React from 'react';
import Reviews from './ReviewPage.js'; 

const Contact = () => {

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <p className="underline">Contact</p>
        </div>

        <div className="row mt-2">
          {/* 주소 */}
          <div className="col-md-6 d-flex align-items-stretch mb-2">
            <div className="info-box">
              <div className="info-box3">
                <h3 className="bx bx-map">Address</h3>
                <p>경기도 안성시 중앙로 327 한경국립대학교 안성캠퍼스 제1공학관 324호</p>
              </div>
            </div>
          </div>

          {/* 소셜 네트워크 */}
          <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch mb-2"> 
            <div className="info-box">
              <div className="info-box4">
                <h3 className="bx bx-share-alt">Social Profiles</h3>
                <div className="social-links">
                  <a href="https://linktr.ee/with_hknu" className="instagram" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://www.hknu.ac.kr/kor/4495/subview.do" className="google-plus" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-skype"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 이메일 */}
          <div className="col-md-6 mt-4 d-flex align-items-stretch mb-2"> 
            <div className="info-box2">
              <div className="info-box5">
                <h3 className="bx bx-envelope">Email</h3>
                <p>pyundj@hknu.ac.kr</p>
              </div>
            </div>
          </div>

          {/* 번호 */}
          <div className="col-md-6 mt-4 d-flex align-items-stretch mb-2">
            <div className="info-box2">
              <div className="info-box6">
                <h3 className="bx bx-phone-call">Call</h3>
                <p>031-670-5160</p>
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 작성 */}
         <Reviews />

      </div>
    </section>
  );
};

export default Contact;
