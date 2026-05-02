## 🖥 프로젝트 소개
- 주제 : 스마트워치를 이용한 고등학생 자기관리 WEB
- 팀명 : 너의하루는 (YourDay)
- 인원 : 4명
- 개발 기간 : 2022.10 ~ 2022.11 (약 3주)


## ⚙ 개발 환경
- Web : JavaScript, React (v17.0.2)
- Server : Node.js (v18.20.8), Flask
- DataBase : MySQL
- MachineLearning : Python (v3.12.10)
- Code Editor : VSCode, Jupyter, DBeaver


## 🔍 주요 기능
- Login
  - ID, PW 값 DB 검증
  - ID LocalStorage에 저장

- Sign Up
  - ID 중복체크 후 DB 저장

- Main
  - 주간 평균 심박수, 심박변이, 안정시 심박수, 운동시간 확인 및 관련 컨텐츠 제공
  - 주간 심박수, 심박변이, 안정시 심박수, 운동시간 추이 라인그래프
  - 어제와 오늘 행복도 비교 막대그래프
  - 주간 행복도 항목 비율 파이그래프
  - 자가체크리스트

- Calendar
  - 날짜 선택 시 데이터 입력 팝업 출력
  - 행복도 선택 및 애플워치 건강데이터 엑셀파일 첨부
  - 데이터 저장 완료 시 출석도장 출력

- History
  - 날짜 선택
  - 선택 날짜의 행복도 막대그래프
  - 선택 날짜의 건강데이터 항목별 라인그래프
  - 선택 날짜 작성한 일기
  
- My Page
  - 이름, 성별, 비밀번호 변경
  - 회원탈퇴
  
- Help
  - 자주 물어보는 질문 답변
  - 서비스 이용 방법 


## 🔁 프로젝트 설치 및 실행
node 16.17.1 설치

nvm 설치

nvm install 16.17.1

nvm use 16.17.1

npm install 실행(node_modules 설치)

MySQL 연결

프로젝트 실행

터미널1

node 서버 실행

node app.js

터미널2

react 실행

npm start

Git 연동

Flask 서버 

Python 설치 https://www.python.org/

"Add Python to PATH" 체크박스 선택

"Customize Installation" 선택 후 기본 옵션으로 진행

VSCode Python Extension 설치

VSCode Python Interpreter ⇒ 설치된 python 선택

Fileupload.py 라이브러리 설치

pip install flask, pandas, pymysql, sqlalchemy

오른쪽 상단 실행 버튼