-- db생성
CREATE DATABASE btapp; 

-- 테이블 확인 
select * from lip_products;
select * from reviews;

-- lip_product 테이블 생성 
CREATE TABLE `lip_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `season` varchar(20) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `shade_number` varchar(50) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- lip_product 데이터 삽입
INSERT INTO lip_products (id, season, brand, name, shade_number, price, description, image, tags) VALUES
(13, '봄', 'Dior', '루즈 디올', '100 누드 룩, 벨벳', 45000, '디올의 시그니처 립스틱으로 부드럽게 발리고 오랫동안 지속됩니다.', 'http://localhost:5000/static/mydb/디올루즈.jpg','moisturizing, long-lasting'),
(14,'봄', 'Laneige', '라뮤즈 립밤', '러스티', 15000, '촉촉한 보습력을 제공하면서 은은한 색감을 추가하는 립밤.', 'http://localhost:5000/static/mydb/라뮤즈립밤.jpg', 'moisturizing, light'),
(15,'봄', 'Etude House', '글로우 픽싱 틴트', '06 피치 블렌디드', 8000, '가벼운 발림성으로 자연스러운 컬러감을 제공합니다.', 'http://localhost:5000/static/mydb/3.png', 'tint, hydrating'),
(16,'봄', 'Clarins', '립 오일', '04 티파야', 35000, '부드러운 발림성과 고급스러운 광택을 제공합니다.', 'http://localhost:5000/static/mydb/4.png', 'hydrating, glossy'),
(17,'여름', 'Beverly', '베르베르 리퀴드 립스틱', '델리컷 로즈 No.14', 35000, '매트한 마무리와 풍부한 색감으로 연출할 수 있는 립스틱.', 'http://localhost:5000/static/mydb/5.png', 'matte ,bold'),
(18,'여름', 'MAC', '더스터 글래스 립스틱', '피그먼트 오브 유어 이매지네이션', 30000, '맥의 스페셜 오일 블렌드와 보습 성분으로 오랜 시간 촉촉하게 유지', 'http://localhost:5000/static/mydb/6.png', 'light, glossy'),
(19,'여름', 'Burt\'s Bees', '롤러 립밤', 'SPF15', 12000, '자극 없이 입술을 촉촉하게 유지해주며 자외선차단 기능성 립밤', 'http://localhost:5000/static/mydb/7.png', 'hydrating, natural'),
(20,'여름', 'NARS', '매트 립스틱', '리치 베리 핑크', 40000, '고농축 색조와 오랜 지속력을 자랑하는 매트 립스틱.', 'http://localhost:5000/static/mydb/8.png', 'matte, long-lasting'),
(21,'가을', 'Etude House', '픽싱 립 틴트', '바닐라 크림', 8000, '가벼운 발림성으로 자연스러운 컬러감을 제공합니다.', 'http://localhost:5000/static/mydb/9.png', 'tint, hydrating'),
(22,'가을', 'Maybelline', '로지 립스틱', '브릭레드', 20000, '따뜻한 컬러로 가을 분위기를 강조하는 립스틱.', 'http://localhost:5000/static/mydb/10.png', 'hydrating, warm'),
(23,'가을', 'Clinique', '립 글로스', '블랙허니', 25000, '입술에 풍부한 보습을 제공해 촉촉하고 부드럽게 발리는 립', 'http://localhost:5000/static/mydb/11.png', 'volumizing, hydrating'),
(24,'가을', 'Yves Saint Laurent', '러브샤인 립스틱', '핑크디자이어', 50000, '편안한 사용감과 맑은 표현으로 가을의 매력을 더하는 립스틱.', 'http://localhost:5000/static/mydb/12.png', 'bold, red'),
(25,'겨울', 'Chanel', '아이코닉 립스틱', 'No.64 이터널', 70000, '고급스러운 패키지와 고농축 색조로 매력적인 입술을 완성.', 'http://localhost:5000/static/mydb/13.png', 'luxury, sophisticated'),
(26,'겨울', 'Giorgio Armani', '립 파운데이션', 'No. 201 다크벨벳', 60000, '부드럽고 매트한 마무리로 입술을 더욱 섬세하게 표현.', 'http://localhost:5000/static/mydb/14.png', 'matte, luxury'),
(27,'겨울', 'Dior', '루지 리퀴드 시퀸', 'No. 703 센세이션', 60000, '쉽게 묻어나지 않는 리퀴드 립스틱은 뛰어난 밀착력과 선명한 컬러로 입술을 화려하게 물들여 줍니다.', 'http://localhost:5000/static/mydb/15.png', 'creamy, luxury'),
(28,'겨울', 'Dior', '꾸뛰르 컬러 립스틱', 'No.994 마스커레이드', 65000, '부드럽고 벨벳 같은 질감으로 고급스러움을 더하는 립스틱.', 'http://localhost:5000/static/mydb/16.png', 'velvet, long-lasting');

-- lip_product tags 수정 
SET SQL_SAFE_UPDATES = 0;
UPDATE lip_products
SET tags = CONCAT('["', REPLACE(tags, ', ', '", "'), '"]')
WHERE tags NOT LIKE '[%]';
SET SQL_SAFE_UPDATES = 1;  -- 안전 모드를 다시 켜기

-- 리뷰 테이블 생성 
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    rating FLOAT CHECK (rating BETWEEN 0 AND 5)
);




