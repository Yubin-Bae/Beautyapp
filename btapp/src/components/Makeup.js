import React, { useState, useRef } from 'react';

const Makeup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImageSrc, setProcessedImageSrc] = useState('');
  const [color, setColor] = useState('#FFFFFF');  // 기본 립스틱 색상
  const [isCameraOpen, setIsCameraOpen] = useState(false);  // 카메라 상태
  const [showUploadMessage, setShowUploadMessage] = useState(true);  // 메시지 표시 상태
  const videoRef = useRef(null);  
  const canvasRef = useRef(null); 

  const defaultLipColor = '#FFFFFF';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);  
      setShowUploadMessage(false);  
      handleUpload(file, color); 
    }
  };

  // 파일 업로드 및 립스틱 적용 함수
  const handleUpload = async (file, color) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("color", color);  // 선택한 색상도 함께 전송

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const timestamp = new Date().getTime();  
        setProcessedImageSrc(`http://127.0.0.1:5000${result.result}?t=${timestamp}`);  
      } else {
        alert(result.error || "이미지 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  // 립스틱 색상 변경 핸들러
  const handleColorClick = async (newColor) => {
    setColor(newColor);
    if (!selectedFile) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }
    handleUpload(selectedFile, newColor);  // 색상을 변경해서 다시 서버에 요청
  };

  // 립 메이크업 초기화 핸들러
  const handleResetMakeup = () => {
    setColor(defaultLipColor);  // 기본 색상으로 변경
    if (selectedFile) {
      handleUpload(selectedFile, defaultLipColor);  // 기본 색상으로 다시 업로드
    }
  };

  // 카메라 열기 핸들러
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

  // 사진 촬영 및 이미지 처리
  const handleCapture = () => {
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], 'captured.png', { type: 'image/png' });
      setSelectedFile(file); 
      setShowUploadMessage(false);
      handleUpload(file, color);  
    });
    setIsCameraOpen(false); 
  };

  return (
    <section id="resume" className="resume">
      <div className="makeup-page">
        <div className="container">
          <div className="section-title">
            <h2>Virtual Makeup</h2>
            <h3>Discover the ideal lip color that suits you best</h3>
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

              <button className="upload-btn" onClick={handleCameraOpen}>사진 촬영</button>

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

              {processedImageSrc && (
                <div>
                  <img
                    id="processed-preview"
                    src={processedImageSrc}
                    alt="Processed Preview"
                    style={{maxWidth: '100%', marginTop: '20px'}}
                  />
                </div>
              )}

              {selectedFile && (
                <button className="upload-btn" onClick={handleResetMakeup} style={{ marginTop: '35px'}}>
                  원래대로
                </button>
              )}
            </div>

            <div className="color-grid">
              <div
                className="color-box"
                style={{ backgroundColor: '#F6555B' }}
                onClick={() => handleColorClick('#F6555B')} //베네피트 차차틴트
              ></div>
              <div
                className="color-box"
                style={{ backgroundColor: '#DE778C' }}
                onClick={() => handleColorClick('#DE778C')} //무지개맨션 오브제 리퀴드 틴트 12호 심볼
              ></div>
              <div
                className="color-box"
                style={{ backgroundColor: '#C26155' }}
                onClick={() => handleColorClick('#C26155')} // 클리오 쉬폰블러틴트 달달초코스무디
              ></div>
              <div
                className="color-box"
                style={{ backgroundColor: '#A4384F' }} 
                onClick={() => handleColorClick('#A4384F')} // 롬앤 블러퍼지틴트 18호 배드베리
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Makeup;
