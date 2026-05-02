
import React, { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "../style/calendar.css";
import "../assets/fonts/font.css";
import Modal from 'react-modal'
import attend from "../layouts/출석도장.png"
import axios from "axios";

const cx = classNames.bind(style);
// react-bootstrap components
import {
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";


const Calendar = () => {

  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
  };

  const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

  const [selectedDay, setSelectedDay] = useState("");

  //이전 달 보기 버튼
  const prevMonth = useCallback(() => {
    
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  //달 선택박스에서 고르기
  const monthControl = useCallback(() => {
    let monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <select
      className="font"
        onChange={changeSelectMonth}
        value={selectedMonth}
      >
        {monthArr}
      </select>
    );
  }, [selectedMonth]);

  //연도 선택박스에서 고르기
  const yearControl = useCallback(() => {
    
    let yearArr = [];
    const startYear = today.year - 10; //현재 년도부터 10년전 까지만
    const endYear = today.year + 10; //현재 년도부터 10년후 까지만
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <select
        className="font"
        onChange={changeSelectYear}
        value={selectedYear}
      >
        {yearArr}
      </select>
    );
  }, [selectedYear]);

  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };
  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

   //요일 반환
  const returnWeek = useCallback(() => {
   
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cx(
            { weekday: true },
            { sunday: v === "일" },
            { saturday: v === "토" }
          )}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 날짜 반환
  const returnDay = useCallback(() => {
    
    let dayArr = [];
    
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <button
              style={{ backgroundColor:"white",
                      // backgroundImage:`url(${attend})`,
                      backgroundImage:"",
                      backgroundRepeat:"no-repeat",
                      backgroundSize:"contain",
                      backgroundPosition: "center"}}
              id="daybox"
             
              onClick={popOpen}
              value={`${selectedYear}-${selectedMonth}-${i + 1}`}
              key={i + 1}
              className={cx(
                {
                  //오늘 날짜일 때 표시할 스타일 클라스네임
                  today:
                    today.year === selectedYear &&
                    today.month === selectedMonth &&
                    today.date === i + 1,
                },
                { weekday: true }, //전체 날짜 스타일
                {
                  //전체 일요일 스타일
                  sunday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 0,
                },
                {
                  //전체 토요일 스타일
                  saturday:
                    new Date(
                      selectedYear,
                      selectedMonth - 1,
                      i + 1
                    ).getDay() === 6,
                }
              )}
            >
              {i + 1}
            </button>
          );
        }
      } else {
        dayArr.push(<div key={`empty-${nowDay}`} className="weekday"></div>);
      }
    }
    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);


  // 출석도장 찍기
  let calDate1 = [];
  let calDate2 =[];
 
  useEffect(()=>{
    let btn = document.getElementsByTagName("button");
    for(let i=0;i<btn.length;i++){
    btn[i].style.backgroundImage='none';
    }
    if (!user.id) return;
    axios.post("http://localhost:3001/uploadDate",{
      id:user.id
    })
    .then((data)=>{
      calDate1 = data.data;
    // 배열에 들어있는 날에 도장 출력
      for(let j=0; j<calDate1.length; j++){
        let year = calDate1[j].substring(0, 4);
        let month = calDate1[j].substring(4, 7);
        let day = calDate1[j].substring(7, 10);
  
        if (month[1] == '0'){
          month = month[0]+month[2] 
        };
        if (day[1] == '0'){
          day = day[0] + day[2] 
        };
        calDate2.push(year+month+day);
      }

      for(let j=0; j<calDate2.length; j++){
        for(let i=0;i<btn.length;i++){
          if(calDate2[j]===btn[i].value){
            btn[i].style.backgroundImage=`url(${attend})`;
            break;
          }
      }
    }
    }).catch(()=>{
      console.log("noDate");
    })
  },[selectedYear,selectedMonth]);

  // 데이터 입력 팝업창 오픈, 클로즈 함수
  function popOpen (e) {
    setSelectedDay(e.target.value);
    setModalIsOpen(true);
  };
  function popClose() {
    setModalIsOpen(false);
  }

  let user = JSON.parse(localStorage.getItem("user")) || { id: "" };
  // 로컬스토리지, 세션스토리지
  // 키-밸류 스토리지의 형태
  // 로컬 스토리지의 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남아 있음 
  // 하지만 세션 스토리지의 데이터는 윈도우나 브라우저 탭을 닫을 경우 제거
  
  return(
  // 달력 전체  
  <div className="container">
    {/* 달력 타이틀 */}
    <div className="title">
      <h4>
        {yearControl()} {monthControl()}
      </h4>
      <div className="pagination">
        <button onClick={prevMonth}>◀︎</button>
        <button onClick={nextMonth}>▶︎</button>
      </div>
    </div>
    {/* 달력 요일 */}
    <div className="week font">
      {returnWeek()}
    </div>
    {/* 달력 날짜 */}
    <div className="date font">
      {returnDay()}
    </div>

    <Modal isOpen={modalIsOpen} id="dataInput">
      <Form action="http://localhost:5000/fileUpload" method="post"
      encType="multipart/form-data">
        <Table border="" align="center" width="500px" height="750px">
            <tr align="center">
                <td>오늘 하루는</td>
                <td align="center">
                  {selectedDay}
                  <input type="hidden" name={"day"} value={selectedDay}></input>
                  <input type="hidden" name={"id"} value={user.id}></input>
                </td>
            </tr>
            
            <tr align="center">
                <td>만족도</td>
                <td>1 2 3 4 5</td>
            </tr>

            <tr align="center">
                <td>수면</td>
                <td>
                    <input type="radio" name={"sleep"} value={1}></input>
                    <input type="radio" name={"sleep"} value={2}></input>
                    <input type="radio" name={"sleep"} value={3}></input>
                    <input type="radio" name={"sleep"} value={4}></input>
                    <input type="radio" name={"sleep"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>등하교</td>
                <td>
                    <input type="radio" name={"goback"} value={1}></input>
                    <input type="radio" name={"goback"} value={2}></input>
                    <input type="radio" name={"goback"} value={3}></input>
                    <input type="radio" name={"goback"} value={4}></input>
                    <input type="radio" name={"goback"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>학업</td>
                <td>
                    <input type="radio" name={"study"} value={1}></input>
                    <input type="radio" name={"study"} value={2}></input>
                    <input type="radio" name={"study"} value={3}></input>
                    <input type="radio" name={"study"} value={4}></input>
                    <input type="radio" name={"study"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>식사시간</td>
                <td>
                    <input type="radio" name={"eat"} value={1}></input>
                    <input type="radio" name={"eat"} value={2}></input>
                    <input type="radio" name={"eat"} value={3}></input>
                    <input type="radio" name={"eat"} value={4}></input>
                    <input type="radio" name={"eat"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>운동시간</td>
                <td>
                    <input type="radio" name={"exercise"} value={1}></input>
                    <input type="radio" name={"exercise"} value={2}></input>
                    <input type="radio" name={"exercise"} value={3}></input>
                    <input type="radio" name={"exercise"} value={4}></input>
                    <input type="radio" name={"exercise"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>여가시간</td>
                <td>
                    <input type="radio" name={"play"} value={1}></input>
                    <input type="radio" name={"play"} value={2}></input>
                    <input type="radio" name={"play"} value={3}></input>
                    <input type="radio" name={"play"} value={4}></input>
                    <input type="radio" name={"play"} value={5}></input>
                </td>
            </tr>

            <tr align="center">
                <td>Diary</td>
                <td><input type="textarea" name="diary" placeholder="Today is..."></input></td>
            </tr>

            <tr>
                <input type="file" name="file" />
                <input type='button' value="뒤로가기" onClick={popClose}></input>
                <input type="submit" value="저장"/>
            </tr>
        </Table>
      </Form>  
    </Modal>
  </div>
  );
}


function User() {
  return (
    <>
      {/* 전체 홈페이지 */}
      <Container fluid>
        <Row>
          {/* 달력 출력 */}
          <Col>
            <Card>
              <Card.Header>
              <Card.Title as="h4">Calendar</Card.Title>
                <p className="card-category">날짜에 행복도를 입력하고 출석도장을 찍어보세요!</p>
              </Card.Header>
              <Card.Body className="cardbody">
                {/* <div className="cldDiv"> */}
                  <Calendar></Calendar>
                {/* </div> */}
              </Card.Body>
              <Card.Footer>         
                <br></br>
                <hr></hr>
                <div className="stats">
                </div>
              </Card.Footer>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default User;
