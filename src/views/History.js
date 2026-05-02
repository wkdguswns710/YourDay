import React from "react";
import axios from "axios";
import "../assets/fonts/font.css";
// react-bootstrap components
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import ChartistGraph from "react-chartist";
import { useRef, useState } from "react";

function History() {
  //스타일 지정
  const icons_css ={
    marginRight : "15px"
  }
  
  // 변수
  let user = JSON.parse(localStorage.getItem("user")) || { id: "" };
  const days = new Date();
  const day = days.getDate() < 10 ? "0" + days.getDate() : days.getDate();
  const today = days.getFullYear() + "-" + (days.getMonth() + 1) + "-" + day;
  const selectDayRef = useRef();
  let [happy_point, setHappy_point] = useState([0,0,0,0,0,0]);
  let [daily_diary, setDaily_diary] = useState("");
  let [vital_hours, setVital_hours] = useState([0,0,0,0,0,0,0]);
  let [vital_hearts,setVital_hearts] = useState([0,0,0,0,0,0,0]);
  let [extime_hours,setExtime_hours] = useState([0,0,0,0,0,0]);
  let [extime_hearts,setExtime_hearts] = useState([0,0,0,0,0,0]);
  let [stress_hours,setStress_hours] = useState([0,0,0,0,0,0]);
  let [stress_hearts,setStress_hearts] = useState([0,0,0,0,0,0]);

  // 함수
  const select_day = async () => {
    console.log("select_day 함수 시작");
    show_happy_data();
    show_vital();
    show_extime();
    show_vital_change();
    console.log("=========> ",selectDayRef.current.value);
    console.log("select_day 함수 종료");
  };
  
  
  // 행복 점수 및 일기 데이터 가져오는 axios
  const show_happy_data = async ()=>{
    console.log("show_happy_data 함수 시작");
    if (selectDayRef.current.value != "연도-월-일") {
      await axios
      .post("http://localhost:3001/day_data", {
        id : user.id,
        selectDay: selectDayRef.current.value,
      })
      .then((res) => {
        console.log("axios happy_point 보내기 성공", res.data);
        let temp = [
          res.data.sleep,
          res.data.goback,
          res.data.study,
          res.data.eat,
          res.data.exe,
          res.data.play
        ];
        console.log(temp);
        setHappy_point(temp);
        setDaily_diary(res.data.diary);  
      })
      .catch(() => {
        console.log("axios happy_point  보내기 실패");
      });  
    }
    console.log("show_happy_data 함수 종료");
  }
  
  // 심박수 데이터 가져오는 axios
  const show_vital = async ()=>{
    await axios.post("http://localhost:3001/vital",{
      selectDay : selectDayRef.current.value+"%",})
    .then((result)=>{
      setVital_hours(result.data.s);
      setVital_hearts(result.data.v);
    })
    .catch(()=>{
      });
    }
 
    // 운동시간 데이터 가져오는 axios
  const show_extime = async ()=>{
    await axios.post("http://localhost:3001/extime",{
      selectDay : selectDayRef.current.value+"%",})
    .then((result)=>{
      setExtime_hours(result.data.s);
      setExtime_hearts(result.data.v);
    })
    .catch(()=>{
      });
    }

     // 심박변이 데이터 가져오는 axios
  const show_vital_change = async ()=>{
    console.log("vital_change 함수 시작");
    console.log("post전 보내는 값 : ",selectDayRef.current.value+"%");
    await axios.post("http://localhost:3001/vital_change",{
      selectDay : selectDayRef.current.value+"%",})
    .then((result)=>{
      console.log("vital_change axios 성공",result.data);
      setStress_hours(result.data.s);
      setStress_hearts(result.data.v);
    })
    .catch(()=>{
      console.log("vital_change axios 실패");
      });
      console.log("vital_change 함수 종료");
    }
    
    return (
    <Container fluid>
      <Row>
        <Col sm="3">
          <Card>
            <Card.Header><Card.Title as="h4">
            <i className="far fa-calendar-check" style={icons_css}></i>
              조회 날짜 선택</Card.Title>
            <p className="card-category">선택한 날짜의 데이터를 확인할 수 있습니다.</p>
            </Card.Header>
            <Card.Body>
            <Form.Group className="d-flex justify-content-around">
              <input style={{width:"60%"}} className="font" type="date" max={today} ref={selectDayRef}></input>
              <Button className="font" onClick={select_day} style={{ marginLeft: "3%" , width:"30%"}}>
                확인
              </Button>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <Card>
            <Card.Header><Card.Title as="h4">
              <i className="far fa-grin-alt" style={icons_css}></i>
              일별 행복도</Card.Title>
            <p className="card-category">선택한 날짜의 행복도를 확인할 수 있습니다.</p></Card.Header>
            <Card.Body>
              <div className="ct-chart" id="chartActivity">
                <ChartistGraph
                className="font"
                  data={{                    
                    labels: [
                      "수면",
                      "등하교",
                      "학업",
                      "식사\n시간",
                      "운동\n시간",
                      "여가\n시간",
                    ],
                    series: [happy_point],
                  }}
                  type="Bar"
                  options={{
                    seriesBarDistance: 10,
                    axisX: {
                      showGrid: false,
                    },
                    height: "245px",
                    max : 5,
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                          
                        },
                      },
                    ],
                  ]}
                />
              </div>
              <div className="legend font">
                <i className="fas fa-circle text-info"></i>
                행복도
              </div>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
           
            </Card.Footer>
          </Card>
        </Col>
        <Col md="7">
          <Card>
            <Card.Header><Card.Title as="h4">
              <i className="far fa-edit" style={icons_css}></i>
              일기장</Card.Title>
            <p className="card-category">선택한 날짜의 일기를 확인할 수 있습니다.</p></Card.Header>
            <Card.Body><div 
            className="font"
            style={
                {
                  border: "1px solid rgb(77, 213, 218)",
                  height: "330px",
                  padding : "10px"
                }
              }>
              {daily_diary}
              </div></Card.Body>
            <Card.Footer>
              <hr></hr>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col md="12">
            <Card>
              <Card.Header>
              <Card.Title as="h4">
                <i className="far fa-heart" style={icons_css}></i>
                일별 심박수</Card.Title>
                <p className="card-category">선택한 날짜의 24시간을 시간별로 측정한 심박수의 평균을 확인할 수 있습니다.</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph 
                  className="font"
                    data={{
                      labels: vital_hours,
                      series: [vital_hearts],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 180,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid:true,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
                <div className="legend font">
                  <i className="fas fa-circle text-info"></i>
                  심박수 
                </div>
              </Card.Body>
          
              
                <Card.Footer>
                <hr></hr>
              </Card.Footer>
       
            </Card>
          </Col>
      </Row>
      <Row>
      <Col md="12">
            <Card>
              <Card.Header>
              <Card.Title as="h4">
              <i className="fas fa-running" style={icons_css}></i>
                일별 운동 시간</Card.Title>
                <p className="card-category">선택한 날짜의 24시간을 시간별로 측정한 운동 시간의 평균을 확인할 수 있습니다.</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                  className="font"
                    data={{
                      labels: extime_hours,
                      series: [extime_hearts],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 60,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid:true,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
                <div className="legend font">
                  <i className="fas fa-circle text-info"></i>
                  운동시간(분) 
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
      </Row>
      <Row>
      <Col md="12">
            <Card>
              <Card.Header>
              <Card.Title as="h4">
                <i className="fas fa-heartbeat" style={icons_css}></i>
                일별 심박변이</Card.Title>
                <p className="card-category">선택한 날짜의 24시간을 시간별로 측정한 심박변이의 평균을 확인할 수 있습니다.</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                  className="font"
                    data={{
                      labels: stress_hours,
                      series: [stress_hearts],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 150,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid:true,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
                
                <div className="legend font">
                  <i className="fas fa-circle text-info"></i>
                  심박수 
                </div>
              </Card.Body>
    
    
              <Card.Footer>
               <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
      </Row>
    </Container>
  );
}

export default History;
