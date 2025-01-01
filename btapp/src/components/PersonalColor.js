import React, { useState, useRef } from 'react';
import axios from 'axios';

const PersonalColor = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [colorType, setColorType] = useState('');
  const [colorPalette, setColorPalette] = useState([]);
  const [analysisMetrics, setMetrics] = useState(''); // 분석 측정값 저장
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지
  const [isCameraOpen, setIsCameraOpen] = useState(false); // 카메라 상태
  const [showUploadMessage, setShowUploadMessage] = useState(true); // 메시지 표시 상태
  const videoRef = useRef(null); // 비디오 요소 참조
  const canvasRef = useRef(null); // 캔버스 참조

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setShowUploadMessage(false); // 메시지 숨기기
      analyzeImage(file);
    }
  };

  // 카메라 열기 핸들러 (한 번의 클릭으로 실행)
  const handleCameraOpen = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setIsCameraOpen(true);
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('카메라 열기에 실패했습니다.', err);
      });
  };

  // 사진 촬영 및 업로드 핸들러
  const handleCapture = () => {
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    // 캔버스 크기를 비디오 크기와 동일하게 설정
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight); 
    videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // 스트림 중지
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], 'captured.png', { type: 'image/png' });
      setImageSrc(URL.createObjectURL(blob)); // 캡처한 이미지 표시
      setShowUploadMessage(false);
      analyzeImage(file); // 업로드
    });
    setIsCameraOpen(false); // 카메라 닫기
  };

  // 이미지 분석 요청 함수
  const analyzeImage = (file) => {
    setLoading(true);
    setResultVisible(false);
    setErrorMessage(''); // 에러 메시지 초기화

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const { colorType, metrics } = response.data;
        if (colorType) {
          setColorType(colorType);
          const colors = getColorsForType(colorType);
          setColorPalette(colors);
          setMetrics(metrics);  // 측정값 저장
          setResultVisible(true);
        } else {
          setErrorMessage('분석에 실패하였습니다. 올바른 이미지를 업로드해주세요.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage('분석에 실패하였습니다. 올바른 이미지를 업로드해주세요.');
        setLoading(false);
        setResultVisible(true); // 결과 영역 보이기
      });
  };

  const getColorsForType = (type) => {
    switch (type) {
      case '봄웜톤(spring)':
        return ['#FF9999', '#FFCC99', '#FFFF99', '#99FF99'];
      case '여름쿨톤(summer)':
        return ['#FF99CC', '#CC99FF', '#99CCFF', '#CCFFFF'];
      case '가을웜톤(fall)':
        return ['#CC9966', '#FF9966', '#FFCC66', '#99CC66'];
      case '겨울쿨톤(winter)':
        return ['#FF0066', '#9900CC', '#0066CC', '#00CCCC'];
      default:
        return ['#CCCCCC', '#999999', '#666666', '#333333'];
    }
  };

  // 측정값을 문자열로 변환하여 렌더링
  const renderMetrics = (metrics) => {
    if (!metrics) return '측정값을 가져올 수 없습니다.';

    const lab_bString = `Lab_b[skin, eyebrow, eye]: ${metrics.Lab_b.join(', ')}`;
    const hsv_sString = `hsv_s[skin, eyebrow, eye]: ${metrics.hsv_s.join(', ')}`;

    return (
      <div>
        {lab_bString}<br /> 
        {hsv_sString}
      </div>
    );
  };

  return (
    <section id="personal" className="personal">
      <div className="personal-color-page">
        <div className="container">
          <div className="section-title">
            <h2>Personal Color</h2>
            <h3>Discover Your Unique Personal Color Palette</h3>
          </div>

          <div className="upload-container">
            {showUploadMessage && (
              <h6>얼굴이 잘 나온 사진을 업로드 해주세요.</h6>
            )}
            <input
              type="file"
              id="fileInput"
              className="file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="upload-btn">사진 업로드</label>

            <button className="upload-btn" onClick={handleCameraOpen}>
              사진 촬영
            </button>

            {isCameraOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '300px' }} />
                <button className="upload-btn"
                  onClick={handleCapture} 
                  style={{ marginTop: '10px', display: 'block' }}
                >
                  촬영
                </button>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {imageSrc && <img id="preview" src={imageSrc} alt="Preview" style={{ maxWidth: '100%', marginTop: '20px' }} />}
          </div>

          {loading && (
            <div className="loading">
              <i className="bx bx-loader-alt"></i>
              <p>분석 중입니다...</p>
            </div>
          )}

          {resultVisible && (
            <div className="result" id="result">
              {errorMessage ? (
                <p style={{ color: 'red' }}>{errorMessage}</p>
              ) : (
                <>
                  <p style={{fontSize: '20px'}}>
                    <strong>당신의 퍼스널 컬러는 {colorType}입니다!</strong>
                  </p>
                  <p>어울리는 색상:</p>
                  <div className="color-palette" id="colorPalette">
                    {colorPalette.map((color, index) => (
                      <div key={index} className="color-swatch" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                                    
                  <div className="metrics"> 
                    <button className="tooltip-btn">
                      자세히보기
                      <span className="tooltip-text">
                        {renderMetrics(analysisMetrics)}
                        Lab_b 값은 웜톤 / 쿨톤을 결정하고,<br />
                        HSV_S 값은 봄 / 가을 또는 여름 / 겨울을 결정함.
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalColor;
