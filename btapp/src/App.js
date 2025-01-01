import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';  // Home 컴포넌트 불러오기
import Header from './components/Header';
import About from './components/About';
import PersonalColor from './components/PersonalColor';
import Makeup from './components/Makeup';
import Lips from './components/Lips';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LipRecommendation from './components/LipRecommendation'; // 립 추천 컴포넌트 불러오기

function App() {
  return (
    <>
      <Header /> {/* 헤더는 항상 표시되지만 위치와 스타일이 달라짐 */}
      <Routes>
        <Route path="/" element={<Home/>} /> {/* 홈 페이지 */}
        <Route path="/about" element={<About />} />
        <Route path="/personal" element={<PersonalColor />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/lips" element={<Lips />} />
        <Route path="/lip-recommendation" element={<LipRecommendation />} /> {/* 립 추천 페이지 추가 */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
