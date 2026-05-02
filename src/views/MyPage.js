import {React, useState, useRef} from "react";
import Modal from "react-modal";
import imgLogo from "../assets/img/yourday-logo.png"
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/fonts/font.css";
// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

function MyPage() {

  const idRef = useRef();
  const pwRef = useRef();
  const pw1Ref = useRef();
  const pw2Ref = useRef();
  const nickRef = useRef();
  const genderRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [wodalIsOpen, setWodalIsOpen] = useState(false);

  // 팝업창 함수
  function popOpen(){
    setModalIsOpen(true)
  }
  function popClose(){
    setModalIsOpen(false)
  }
  function popOpen2(){
    setWodalIsOpen(true)
  }
  function popClose2(){
    setWodalIsOpen(false)
  }

  let user = JSON.parse(localStorage.getItem("user")) || { id: "", pw: "", nick: "", gender: "", birth: "", joindate: "", phoneNumber: "" };
  // JSON.parse : json 문자 구문을 js에서 사용할 수 잇는 객체 타입으로 변환

  // 마이페이지 - 이름 및 성별 변경
  // 변경 성공 띄우고 다른 페이지 갔다 오면 원래대로인 것 같은데..?
  // 다시 로그인하면 됨
  const UpdateMypage = async(e) => {
    e.preventDefault();
    // preventDefault
    // 1. a 태그를 눌렀을때도 href 링크로 이동하지 않게 할 경우
    // 2. form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우 (submit은 작동됨)
    console.log("UpdateMypage")
    console.log("정보전송 되냐..?",nickRef.current.value)
    console.log("정보전송되냐고욘!!!! ",genderRef.current.value)
    await axios.post("http://localhost:3001/Update",{
      id : user.id,
      nick:nickRef.current.value,
      gender:genderRef.current.value,      
    })
    .then((res)=>{
      console.log("DB로 데이터 보내기 성공",res)
        alert("회원정보변경 성공!!!");
    })
    .catch((err)=>{
      console.log("DB로 데이터 보내기 실패")
    })
  }

  // 마이페이지 - 비밀번호 변경
  // 비밀번호 변경 완료시 팝업창 꺼졌으면 좋겠음
  const UpdatePWMypage = async(e) => {
    e.preventDefault();
    console.log("정보전송 되냐..?",pwRef.current.value)
    if(pw1Ref.current.value == pw2Ref.current.value){
      console.log("비번변경 진행중입니다")
      await axios.post("http://localhost:3001/UpdatePW",{
        id : user.id,
        pw1 : pw1Ref.current.value,
      })
      .then((res)=>{
          console.log("DB로 데이터 보내기 성공")
          alert("비밀번호 변경 성공!!!");
        })
      .catch((err)=>{
        console.log("DB로 데이터 보내기 실패")
      })
    }
    else{
      alert("현재 비밀번호 또는 변경할 비밀번호를 정확하게 기입해주세요.");
    }
  }

  // 마이페이지 - 회원탈퇴
  const Withdraw = async(e) => {
    e.preventDefault();
    console.log("담긴 정보",user)
    await axios.post("http://localhost:3001/Delete",{
      id  : user.id,
    })
    .then((res)=>{
      console.log("DB와 데이터 연동 성공!!!",res)
      alert("회원탈퇴를 하셨습니다!");
      window.location.replace("/");
    })
    .catch((err)=>{
      console.log("DB와 데이터 연동 실패!!")
    })
  }
  
  return (
    <>
      <Container fluid style={{ display: "flex",
    justifyContent: "center",
    alignItems: "center",}}>
            <Card style={{maxWidth:"50%", minWidth:"500px"}}>
              <Card.Header>
                <Card.Title as="h4" className="font">My Page</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={UpdateMypage}>

                      <Form.Group className="mb-3">
                        <Form.Label className="font">아이디</Form.Label>
                        <Form.Control
                          className="font"
                          defaultValue={user.id}
                          disabled
                          placeholder="ID"
                          type="text"
                      ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label className="font">이름</Form.Label>
                        <Form.Control
                        className="font"
                          defaultValue={user.nick}
                          placeholder="Name"
                          type="text"
                          ref={nickRef}
                          required
                      ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label className="font">성별</Form.Label>
                        <Form.Control
                        className="font"
                          defaultValue={user.gender}
                          placeholder="gender"
                          type="text"
                          ref={genderRef}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="font">생년월일</Form.Label>
                        <Form.Control
                        className="font"
                          defaultValue={user.birth.substr(0, 10)}
                          disabled
                          placeholder="Birth_date"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="font">회원가입 날짜</Form.Label>
                        <Form.Control
                        className="font"
                          defaultValue={user.joindate.substr(0, 10)}
                          disabled
                          placeholder="Join_Date"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                  <Form.Group className="mb-3 d-flex justify-content-around">
                  <Button onClick={popOpen} className="ChangePW font"  variant="primary" >비밀번호 변경</Button>                
                  <Button onClick={popOpen2} className="Withdrawal font" variant="primary">회원탈퇴</Button>
                  <Button className="font" variant="primary" type="submit">확인</Button>              
                  <Link to="/Dashboard.js">
                    <Button className="font" variant="primary">취소</Button>
                  </Link>
                  </Form.Group>
                </Form>
                
              </Card.Body>
              <Card.Footer>
              <hr></hr>
              </Card.Footer>
            </Card>
   
                  <Modal isOpen={modalIsOpen} id="dataInput" >
                    <Form onSubmit={UpdatePWMypage}>
                    <table border="">
                      <tr>
                        <td rowSpan="4" style={{backgroundColor:"rgb(65, 131, 201)"}}><img style={{width:"200px"}} src={imgLogo}/></td>
                        <td> 현재 비밀번호 </td>
                        <td><input type="PassWord" placeholder="사용중인 비밀번호" ref={pwRef} required></input></td>
                      </tr>
                      <tr>
                        <td> 변경 비밀번호 </td>  
                        <td><input type="password" placeholder="변경할 비밀번호" ref={pw1Ref} required></input></td>
                      </tr>
                      <tr>
                        <td> 비밀번호 확인 </td>
                        <td><input type="password" placeholder="변경할 비밀번호 확인" ref={pw2Ref} required></input></td>
                      </tr>
                      <tr align="center">
                        <td colSpan="4">
                        <Form.Group className="mt-3 mb-3 d-flex justify-content-around">
                        <Button className="font" variant="primary" type="submit" >비밀번호 변경</Button>
                        <Button className="font" variant="primary"onClick={popClose} >닫기</Button>
                        </Form.Group>
                        </td>
                      </tr>
                    </table>
                    </Form>
                  </Modal >
                  <Modal isOpen={wodalIsOpen} id="UserWithdrawal">
                    <table align="center">
                      <tr align="center">정말 회원탈퇴를 하시겠습니까?</tr>
                    </table>
                    <br></br>
                    <br></br>
                    <Form onSubmit={Withdraw}>
                      <table align="center">
                      <tr><Button onClick={popClose2}>취소</Button><Button type="submit">확인</Button></tr>
                      </table>
                    </Form>
                  </Modal>
      </Container>
    </>
  );
}
export default MyPage;