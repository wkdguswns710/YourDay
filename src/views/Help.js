import React, { useState } from "react";
import img1 from "../layouts/회원탈퇴.png"
import img2 from "../layouts/회원탈퇴2.png"
import img3 from "../layouts/비밀번호변경성공.png"
import img4 from "../layouts/비밀번호변경실패.png"
import img5 from "../layouts/데이터등록.png"

import img6 from "../layouts/회원가입.png"
import img7 from "../layouts/로그인.png"
import img8 from "../layouts/날짜선택.png"
import img9 from "../layouts/데이터 입력.png"
import img10 from "../layouts/입력확인.png"
import img11 from "../layouts/메인페이지확인1.png"
import img12 from "../layouts/일별 데이터 조회.png"
import "../assets/fonts/font.css";

// react-bootstrap components
import {
  Tabs,
  Tab,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";


function toggleBtn1(){
  const btn1 = document.getElementById("btn1");
  if(btn1.style.display == "none"){
    btn1.style.display = "block";
  }
  else{
    btn1.style.display= "none";
  }
}

function toggleBtn2(){
  const btn2 = document.getElementById("btn2");
  if(btn2.style.display !== "none"){
    btn2.style.display = "none";
  }
  else{
    btn2.style.display= "block";
  }
}

function toggleBtn3(){
  const btn3 = document.getElementById("btn3");
  if(btn3.style.display !== "none"){
    btn3.style.display = "none";
  }
  else{
    btn3.style.display= "block";
  }
}

function toggleBtn4(){
  const btn4 = document.getElementById("btn4");
  if(btn4.style.display !== "none"){
    btn4.style.display = "none";
  }
  else{
    btn4.style.display= "block";
  }
}

function toggleBtn5(){
  const btn5 = document.getElementById("btn5");
  if(btn5.style.display !== "none"){
    btn5.style.display = "none";
  }
  else{
    btn5.style.display= "block";
  }
}

function toggleBtn6(){
  const btn6 = document.getElementById("btn6");
  if(btn6.style.display !== "none"){
    btn6.style.display = "none";
  }
  else{
    btn6.style.display= "block";
  }
}         
function toggleBtn7(){
  const btn7 = document.getElementById("btn7");
  if(btn7.style.display == "block"){
    btn7.style.display = "none";
    btn8.style.display = "none";
  }
  else{
    btn7.style.display= "block";
    btn8.style.display = "none";
  }
}         
function toggleBtn8(){
  const btn8 = document.getElementById("btn8");
  if(btn8.style.display == "none"){
    btn8.style.display = "block";
    btn7.style.display = "none";
  }
  else{
    btn8.style.display= "none";
    btn7.style.display = "none";
  }
}         
 
function Help() {
  return (
    <>
      <Container className="d-flex justify-content-around" fluid style={{display:"block"}} id="btn7">
     <Row>
      <Col>
      <Tabs
      defaultActiveKey="faq"
      id="uncontrolled-tab-example"
      >
      <Tab eventKey="faq" title="FAQ">
      <Card >
              <Card.Header>
                <Card.Title as="h4">FAQ</Card.Title>
                <p className="card-category">
                  고객님들이 자주하는 질문에 대해서 답변을 드립니다.
                </p>
              </Card.Header>
              <Card.Body>                
                <table border="">
                  <tbody>
                  <tr>
                    <td className="font" align="center">No.</td>
                    <td className="font" align="center">제 목</td>
                  </tr>
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">1</td>
                    <td className="font" align="center" onClick={toggleBtn1} >Q. 회원탈퇴는 어디에서 하나요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:"none"}} align="center" id="btn1" onClick={toggleBtn1}>
                      <img src={img1}/><br></br><br></br>① 마이페이지 ▶ 회원탈퇴
                      <br></br>
                      <img src={img2}/>
                      <br></br>
                      ② 확인 버튼을 누르면 회원탈퇴
                      <br></br><br></br>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">2</td>
                    <td className="font" align="center" onClick={toggleBtn2}>Q. 비밀번호 변경은 어디에서 하나요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:'none'}} align="center" id="btn2" onClick={toggleBtn2}>
                      <br></br>① 마이페이지 ▶ 비밀번호 변경
                      <br></br>현재 비밀번호, 변경 비밀번호,비밀번호 확인 입력 후
                      <br></br>비밀번호 변경 클릭
                      <br></br><br></br>
                      <span align="left">1) 비밀번호 변경 성공 시</span>
                      <br></br>
                      <img src={img3}/><br></br>
                      <br></br>2) 비밀번호 변경 실패 시<br></br>
                      <img src={img4}/><br></br>
                      </td>
                  </tr>                  
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">3</td>
                    <td className="font" align="center" onClick={toggleBtn3}>Q. 구글아이디가 있는데 구글아이디로 로그인이 가능하나요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:'none'}} align="center" id="btn3" onClick={toggleBtn3}> 현재 저희 사이트의 계정 외에는 연동이 불가능합니다.<br></br>이용에 불편을 드려 죄송합니다.</td>
                  </tr>                  
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">4</td>
                    <td className="font" align="center" onClick={toggleBtn4}>Q. 결과값을 도출하는 근거가 무엇인가요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:'none'}} align="center" id="btn4" onClick={toggleBtn4}>교육부의 "학생건강증진 정책방향"과 <br></br>"고등학생의 신체활동에 따른 수면의 질 및 심박변이도" <br></br>논문을 바탕으로 입력받은 데이터를 분석하고 종합하여 <br></br>결과를 도출하였습니다.</td>
                  </tr>                  
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">5</td>
                    <td className="font" align="center" onClick={toggleBtn5}>Q. 스마트워치의 데이터를 옮기는 방법이 어떻게 되나요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:'none'}} align="center" id="btn5" onClick={toggleBtn5}>
                      1) 스마트워치에서 엑셀 파일 다운로드<br></br><img src={img1}/><br></br>2) 다운로드 받은 엑셀 파일 마이페이지에 등록<br></br><img src={img5}/><br></br>①Day_WRITE 페이지 ▶ 날짜 선택 ▶ 파일등록 ▶ 제출<br></br></td>
                  </tr>        
                  
                  <tr>
                    <td className="font" align="center" rowSpan="2">6</td>
                    <td className="font" align="center" onClick={toggleBtn6}>Q. 건강관리기능을 가지고 있는데 체지방이나 근육량도 알 수 있나요?</td>
                  </tr>

                  <tr>
                    <td className="font" style={{display:'none'}} align="center" id="btn6" onClick={toggleBtn6}>현재 저희가 받은 데이터로 알 수 있는 정보는<br></br> 심박수, 심박변위, 운동량, 행복도, 스트레스지수 입니다.<br></br>앞으로 자신에 대한 더 많은 정보를 알 수 있도록 발전하는<br></br> "너의 하루는"이 되겠습니다.</td>
                  </tr>
                  </tbody>
                </table>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
              </Card>
              </Tab>

              <Tab eventKey="service" title="서비스 이용 방법">
              <Card>
              <Card.Header>
                <Card.Title as="h4">서비스 이용방법 안내</Card.Title>
                <p className="card-category">
                  서비스를 이용하는 순서 및 방법에 대해서 설명해드리겠습니다.
                </p>
              </Card.Header>

              <Card.Body>
                <br></br><h6>① 회원가입 페이지 ▶ 회원가입 진행</h6>
                <br></br><img style={{width:"600px"}} src={img6}/><br></br>
                <br></br><h6>② 로그인 페이지 ▶ 로그인</h6>
                <br></br><img style={{width:"600px"}} src={img7}/><br></br>
                <br></br><h6>③ DAY_WRITE 페이지 ▶ 데이터입력을 원하는 날짜 선택</h6>    
                <br></br><img style={{width:"600px"}} src={img8}/><br></br>
                <br></br><h6>④ 데이터 입력</h6>
                <br></br><img style={{width:"600px"}} src={img9}/><br></br>
                <br></br><h6>⑤ 데이터 입력 확인</h6>
                <br></br><img style={{width:"600px"}} src={img10}/><br></br>
                <br></br><h6>⑥-① 메인페이지 ▶ 솔루션 및 그래프 확인</h6>
                <br></br><img style={{width:"600px"}} src={img11}/>
                <br></br><h6>⑥-② 솔루션 클릭 ▶ 관련자료제공</h6>
                <br></br><h6>⑦ Day_Data 페이지 ▶ 일별 데이터 조회</h6>
                <br></br><img style={{width:"600px"}} src={img12}/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
              </Card>
              </Tab>
      </Tabs>
      </Col>
</Row>
  
      

      </Container>
      
    </>
  );
}

export default Help;
