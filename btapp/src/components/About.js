import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-me container">
        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <img src="/img/me.jpg" alt="About section background" />
          </div>

          <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3 className="heading">우리의 프로젝트를 소개합니다</h3>
            <p class="custom-text">
              저희 팀은 퍼스널 컬러 진단 서비스와 가상 립 메이크업을 제공하는 웹 서비스를 개발하였습니다. 저희 웹사이트에서는 자신에게 가장 잘 어울리는 퍼스널 컬러를 진단받고, 그에 어울리는 립 메이크업 색상을 가상으로 체험할 수 있습니다.
            </p>

            <br></br>
            <h3 className="heading">왜 Beauty Planet인가요?</h3>
            <p className="custom-text">
              Beauty Planet은 아름다움을 뜻하는 "Beauty"와 행성을 뜻하는 "Planet"의 합성어로, 아름다움을 탐구하는 넓은 세상과 개인의 고유한 매력을 찾아주는 공간을 의미합니다. 이 프로젝트는 AI 기술을 활용하여 누구나 쉽게 자신에게 맞는 색상과 스타일을 발견할 수 있도록 도와줍니다.
            </p>
            <p className="custom-text">
              퍼스널 컬러와 가상 립 메이크업은 단순한 트렌드를 넘어, 개인의 독창적인 매력을 발견하는 중요한 요소입니다. 이 주제를 선택한 이유는 더 많은 사람들이 자신만의 아름다움을 찾고, 그에 대한 자신감을 가질 수 있도록 돕기 위해서입니다.
            </p>
            
            <div className="key-features">
              <h3 className="heading">주요 기능</h3>
              <ul>
                <li><i className="bi bi-circle custom-icon"></i> <strong>퍼스널 컬러 진단: </strong> AI 기반의 정밀한 진단으로 자신에게 가장 어울리는 색상을 찾아드립니다.
                </li>
                <li><i className="bi bi-circle custom-icon"></i> <strong>가상 립 메이크업: </strong> 자신에게 어울리는 립 메이크업 색상을 가상으로 체험해보세요.
                </li>
              </ul>

              <p className="custom-text">
                Beauty Planet에서 당신만의 아름다움을 발견하세요. <br></br> 혁신적인 퍼스널 컬러 진단과 가상 메이크업 서비스를 통해 자신에게 가장 어울리는 스타일을 찾아, 더 매력적인 당신을 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
