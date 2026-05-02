import React, { useEffect } from "react";
import ChartistGraph from "react-chartist";
import "../assets/fonts/font.css";
import { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";

// 솔루션 modal 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 30,
  p: 4,
};

// 주간꺾은선그래프 x축 날짜
var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

// 심박수
let heartM;
let heartT;
let heartW;
let heartTh;
let heartF;
let heartSa;
let heartSu;
let avgheart;
// 심박변이
let chM;
let chT;
let chW;
let chTh;
let chF;
let chSa;
let chSu;
// 안정시 심박수
let restM;
let restT;
let restW;
let restTh;
let restF;
let restSa;
let restSu;
let avgrest;
// 운동량
let extM;
let extT;
let extW;
let extTh;
let extF;
let extSa;
let extSu;
let avgext;
// 주간 만족도
let wsleep;
let wgoback;
let wstudy;
let weat;
let wexe;
let wplay;
let wtotal;

// 일간 만족도
let dsleep;
let dgoback;
let dstudy;
let deat;
let dexe;
let dplay;

// 어제 만족도

let ysleep;
let ygoback;
let ystudy;
let yeat;
let yexe;
let yplay;

// 유산소 링크

function Main({match}) {
    const [Vital, setVital] = useState("")
    const [Vital_time, setVital_time] = useState('')

    const [Ch, setCh] = useState("")
    const [Ch_time, setCh_time] = useState('')

    const [Rest, setRest] = useState("")
    const [Rest_time, setRest_time] = useState('')

    const [Ext, setExt] = useState("")
    const [Ext_time, setExt_time] = useState('')
    
    const [Ddate, setDdata] = useState("")
    const [Ydata, setYdata] = useState("")
    const [Wdata, setWdata] = useState("")

    // 행복 점수 및 일기 데이터 가져오는 axios
    const vital = match.params.vital;
 
    // 심박수
    const sim = async ()=>{
      axios.post("http://localhost:3001/Dashboard1",{})
      .then((data)=>{
        let heartsum = 0;

        if(data.data.length > 0) {
          for(let i=0; i<data.data.length; i++){
            heartsum += data.data[i].heart;
          }
          avgheart = heartsum/7
          heartM = data.data[0].heart;
          heartT = data.data[1].heart;
          heartW = data.data[2].heart;
          heartTh = data.data[3].heart;
          heartF = data.data[4].heart;
          heartSa = data.data[5].heart;
          heartSu = data.data[6].heart;

          setVital(data.data)
          setVital_time(data.data.Vital_time)
        }
      }).catch((e)=>{
        console.log("심박수 에러", e);
      })
    }
    useEffect(()=>{
      sim();
    },[])

    // 심박변이
    const sim_ch = async ()=>{
      axios.post("http://localhost:3001/Dashboard2",{})
      .then((data)=>{
        if(data.data.length > 0) {
          chM = data.data[0].stress;
          chT = data.data[1].stress;
          chW = data.data[2].stress;
          chTh = data.data[3].stress;
          chF = data.data[4].stress;
          chSa = data.data[5].stress;
          chSu = data.data[6].stress;

          setCh(data.data)
          setCh_time(data.data.Ch_time)
        }
      }).catch(()=>{
        console.log("심박변이 에러");
      })
    }
    useEffect(()=>{
      sim_ch();
    },[])
    
    // 안정시 심박수
    const rest = async ()=>{
      axios.post("http://localhost:3001/Dashboard7",{})
      .then((data)=>{
        let restsum = 0;
        
        if(data.data.length > 0) {
          for(let i=0; i<data.data.length; i++){
            restsum += data.data[i].rest;
          }
          avgrest = restsum/7
          restM = data.data[0].rest;
          restT = data.data[1].rest;
          restW = data.data[2].rest;
          restTh = data.data[3].rest;
          restF = data.data[4].rest;
          restSa = data.data[5].rest;
          restSu = data.data[6].rest;


          setRest(data.data)
          setRest_time(data.data.rt)
        }
      }).catch(()=>{
        console.log("안정시 심박수 에러");
      })
    }
    useEffect(()=>{
      rest();
    },[])

    let extsum;
    // 운동시간 axios
    const extime = async ()=>{
      axios.post("http://localhost:3001/Dashboard3",{})
      .then((data)=>{
        if(data.data.length > 0) {
          for(let i=0; i<data.data.length; i++){
            extsum += data.data[i].ext;
          }
          avgext = extsum/7
          extM = data.data[0].ext;
          extT = data.data[1].ext;
          extW = data.data[2].ext;
          extTh = data.data[3].ext;
          extF = data.data[4].ext;
          extSa = data.data[5].ext;
          extSu = data.data[6].ext;

          setExt(data.data)
          setExt_time(data.data.Ext_time)
        }
      }).catch(()=>{
        console.log("운동시간 에러");
      })
    }
    useEffect(()=>{
      extime();
    },[])

    // 오늘 만족도
    const dayhappy = async ()=>{
      axios.post("http://localhost:3001/Dashboard4",{})
      .then((data)=>{
        if(data.data.length > 0) {
          dsleep = data.data[0].dsleep;
          dgoback = data.data[0].dgoback;
          dstudy = data.data[0].dstudy;
          deat = data.data[0].deat;
          dexe = data.data[0].dexe;
          dplay = data.data[0].dplay;
          
          setDdata(data.data)
        }
      }).catch(()=>{
        console.log("만족도 에러");
      })
    }
    useEffect(()=>{
      dayhappy();
    },[])
  
    // 어제 만족도
    const yhappy = async ()=>{
      axios.post("http://localhost:3001/Dashboard5",{})
      .then((data)=>{       
        if(data.data.length > 0) {
          ysleep = data.data[0].ysleep;
          ygoback = data.data[0].ygoback;
          ystudy = data.data[0].ystudy;
          yeat = data.data[0].yeat;
          yexe = data.data[0].yexe;
          yplay = data.data[0].yplay;
          
          setYdata(data.data)
        }
      }).catch(()=>{
        console.log("어제 만족도 에러");
      })
    }
    useEffect(()=>{
      yhappy();
    },[])

    // 주간 만족도 평균
    const whappy = async ()=>{
      axios.post("http://localhost:3001/Dashboard6",{})
      .then((data)=>{
        if(data.data.length > 0) {
          wtotal =Number(data.data[0].wsleep)+Number(data.data[0].wgoback)+Number(data.data[0].wstudy)+Number(data.data[0].weat)+Number(data.data[0].wexe)+Number(data.data[0].wplay);
          wsleep = Number(data.data[0].wsleep)/wtotal*100;
          wgoback = Number(data.data[0].wgoback)/wtotal*100;
          wstudy = Number(data.data[0].wstudy)/wtotal*100;
          weat = Number(data.data[0].weat)/wtotal*100;
          wexe = Number(data.data[0].wexe)/wtotal*100;
          wplay = Number(data.data[0].wplay)/wtotal*100+0.000000000000008;
          
          setYdata(data.data)
        }
      }).catch(()=>{
        console.log("주간 만족도 평균 에러");
      })
    }
    useEffect(()=>{
      whappy();
    },[])

  // 심박수 MODAL
  const [Simmodal, setSimmodal] = useState(false);
  function simOpen(){
    setSimmodal(true)
  }
  function simClose(){
    setSimmodal(false)
  }

  // 심박변이 MO
  const [Chmodal, setChmodal] = useState(false);
  function ChOpen(){
    setChmodal(true)
  }
  function ChClose(){
    setChmodal(false)
  }

  // 안정시심박수 MO
  const [Remodal, setRemodal] = useState(false);
  function ReOpen(){
    setRemodal(true)
  }
  function ReClose(){
    setRemodal(false)
  }

  // 운동 MO
  const [Exemodal, setExemodal] = useState(false);
  function ExeOpen(){
    setExemodal(true)
  }
  function ExeClose(){
    setExemodal(false)
  }

  function open1(){
    window.open("https://www.youtube.com/results?search_query=%EB%95%85%EB%81%84%EB%B6%80%EB%B6%80+%EC%9C%A0%EC%82%B0%EC%86%8C%EC%9A%B4%EB%8F%99", "_blank","fullscreen=yes");
  }
  
  // 새창으로 열기
  function open2(){
    window.open("https://www.youtube.com/watch?v=6zsHvi7aqjE", "fullscreen=yes");
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon 	fas fa-heartbeat text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">심박수</p>
                    <Card.Title as="h4">{heartSu} BPM</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats font">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                    {heartSu>=avgheart ? "최근 일주일 평균 이상이에요!" : "최근 일주일 평균 이하에요!"}
                </div>
                <div style={{display:'block'}}>
                      <Button className="font" onClick={simOpen}>자세히</Button>
                      <Modal
                        className="font"
                        open={Simmodal}
                        onClose={simClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            심박수
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            심박수
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon fas fa-chart-line text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers font">
                      {/* 기기마다 혈중 산소도를 가능 여부가 달라 스트레스 지수보단 심박수 변이가 용이 */}
                      <p className="card-category">심박변이</p>
                      <Card.Title as="h4">{chSu} BPM</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats font">
                  {/* <i className="far fa-calendar-alt mr-1"></i> */}
                    {(chSu>=50) ? "심박변이에 따르면 매우 건강합니다!" : (30>chSu>=10) ? ("전문가에게 진료가 필요합니다!"):("심박변이에 따르면 관리가 필요합니다!")}
                </div>
                    <div style={{display:'block'}}>
                      <Button className="font" onClick={ChOpen}>자세히</Button>
                      <Modal
                      
                        open={Chmodal}
                        onClose={ChClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style} >
                          <Typography className="font" id="modal-modal-title" variant="h6" component="h2">
                            심박변이
                          </Typography>
                          <Typography className="font" id="modal-modal-description" sx={{ mt: 2 }}>
                            애플워치 심박데이터 기준에 따르면<br></br>
                            50 BPM 이상은 매우 건강!<br></br>
                            10~30 BPM 사이는 관리 필요!<br></br>
                            10 미만은 전문적인 치료 필요!<br></br>
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon fas fa-star-and-crescent text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers font">
                      <p className="card-category">안정시 심박수</p>
                      <Card.Title as="h4">{restSu} BPM</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats font">
                  {/* <i className="far fa-clock-o mr-1"></i> */}
                  {(restSu<=69) ? "안정시 심박수가 정상입니다!" : (70<=restSu<=80) ? ("유산소 운동이 필요합니다!"):("당뇨 위험:3.8배! / 고혈압 위험: 1.3배! 전문가 상담 필요!")}
                </div>
                <div style={{display:'block'}}>
                      <Button className="font" onClick={ReOpen}>자세히</Button>
                      <Modal
                        open={Remodal}
                        onClose={ReClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            안정시 심박수란?
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            안정시 심박수는 만성질환과 밀접한 연관이 있다.<br></br>
                            대사증후군 : 안정시 심박수가 80 BPM 이상인 경우 유병률이 2.34배 높다.<br></br>
                            당뇨 : 60~70 BPM 사이에서 혈당과 중성지방이 유의하게 높고, 90BPM이 넘으면 당뇨유병률이 남자는 3.85배 여자는 3.34배 높다.<br></br>
                            고혈압 : 80 BPM 이상이면 유병률이 1.27배 90 BPM 이상이면 2.75배 높다.<br></br>
                            심혈관 질환 : 10 BPM 증가할 때마다 사망률 심혈관질환 15%, 심장마비 9%, 심부전 18%, 뇌졸중 6% 증가<br></br>
                            암 : 10 BPM 증가할 때마다 대장암 유병률 30% 증가<br></br>
                            <br></br>
                            "건강예측 요인으로서의 안정시심박수의 가치와 의미" -암당뇨운동의학센터, 신촌세브란스 암예방센터- <br></br>
                            <br></br>
                            <br></br>
                            안정시 심박수를 낮추기 위한 생활습관<br></br>
                            유산소운동 (30주 이상 지속한 장기운동 연구에서 관찰)<br></br>
                            충분한 수면과 규칙적인 수면습관<br></br>
                            금주와 금연
                            <br></br>
                            <br></br>
                            안정시 심박수는 유산소!
                            <br></br>
                            <br></br>
                            추천영상 : 
                            <div>
                            <input type="button" onClick={open1} value="집에서 하는 유산소!"/>
                            </div>
                            <div>
                            <input type="button" onClick={open2} value="계란과 함께 달리기!"/>
                            </div>
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon fas fa-walking text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers font">
                      <p className="card-category">운동시간</p>
                      <Card.Title as="h4">{extSu}분</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats font">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  {extM>=avgext ? "열심히 운동하셨네요!" : "이번주 평균보다 운동시간이 적습니다!"}
                </div>
                <div style={{display:'block'}}>
                      <Button className="font" onClick={ExeOpen}>자세히</Button>
                      <Modal
                        open={Exemodal}
                        onClose={ExeClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            운동시간
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            운동 추천
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
        <Row>
        <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">주간 하루 평균 데이터</Card.Title>
                <p className="card-category">스마트워치 건강 앱 항목별 추이</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                  className="font"
                    data={{
                      labels: [
                        [year+'-'+month+'-'+('0' + (today.getDate()-6)).slice(-2)],
                        [year+'-'+month+'-'+('0' + (today.getDate()-5)).slice(-2)],
                        [year+'-'+month+'-'+('0' + (today.getDate()-4)).slice(-2)],
                        [year+'-'+month+'-'+('0' + (today.getDate()-3)).slice(-2)],
                        [year+'-'+month+'-'+('0' + (today.getDate()-2)).slice(-2)],
                        [year+'-'+month+'-'+('0' + (today.getDate()-1)).slice(-2)],
                        [year+'-'+month+'-'+day],
                      ],
                      series: [
                        [heartM, heartT, heartW, heartTh, heartF, heartSa, heartSu],  // 심박수
                        [chM, chT, chW, chTh, chF, chSa, chSu],   // 심박변이
                        [extM, extT, extW, extTh, extF, extSa, extSu], // 운동량
                        [restM, restT, restW, restTh, restF, restSa, restSu], // 안정시 심박수
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 110,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
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
              </Card.Body>
              <Card.Footer>
                <div className="legend font">
                  <i className="fas fa-circle text-info"></i>심박수
                  <i className="fas fa-circle text-danger"></i>심박변이
                  <i className="fas fa-circle text-bgDeepPurple"></i>안정시 심박수
                  <i className="fas fa-circle text-warning"></i>운동량
                </div>
                <hr></hr>
                <div className="stats font">
                  <i className="fas fa-history"></i>
                  최근 7일 데이터
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
        <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">어제와 오늘의 행복도</Card.Title>
                <p className="card-category">어제와 오늘의 주간 행복도 평균 비교</p>
              </Card.Header>
              <br></br>
              <Card.Body>
                <div className="ct-chart"  id="chartActivity">
                  <ChartistGraph
                  className="font"
                    data={{
                      labels: ["수면","출퇴근","업무","식사\n시간","운동\n시간","여가\n시간"],
                      series: [
                        [ysleep,ygoback,ystudy,yeat,yexe,yplay],[dsleep,dgoback,dstudy,deat,dexe,dplay],
                        // 왼쪽이 어제 오른쪽이 오늘
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
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
              </Card.Body>
              <Card.Footer>
                <div className="legend font">
                  <i className="fas fa-circle text-info"></i>
                  어제 <i className="fas fa-circle text-danger"></i>
                  오늘
                </div>
                <br></br>
                <hr></hr>
                <div className="stats font">
                  <i className="fas fa-check"></i>
                  어제와 오늘의 비교
                </div>
              </Card.Footer>
            </Card>
          </Col>
        <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">주간 행복도 비율</Card.Title>
                <p className="card-category">일주일 중 어떤 활동이 행복했을까?</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                  // 주간 파이
                  className="font"
                    data={{
                      labels:["수면","출퇴근","업무","식사","운동","여가"],
                      series: [
                        Number(wsleep)>=1?Number(wsleep):1,
                        Number(wgoback)>=1?Number(wgoback):1,
                        Number(wstudy)>=1?Number(wstudy):1,
                        Number(weat)>=1?Number(weat):1,
                        Number(wexe)>=1?Number(wexe):1,
                        Number(wplay)>=1?Number(wplay):1
                      ]
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>수면
                  <i className="fas fa-circle text-danger"></i>출퇴근
                  <i className="fas fa-circle text-warning"></i>업무
                  <br></br>
                  <i className="fas fa-circle text-secondary" style={{color:"purple"}}></i>식사시간                   
                  <i className="fas fa-circle text-success"></i>운동시간 
                  <i className="fas fa-circle text-primary"></i>여가시간             
                </div>
                <hr></hr>
                <div className="stats font" style={{fontSize:"14px"}}>
                <i className="fas fa-check"></i>
                  일주일마다 비교
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          
          <Col md="4">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">자가체크리스트</Card.Title>
                <p className="card-category">이번주를 되돌아보는 시간을 가져봅시다.</p>
                <br></br>
                <p className="card-category">여가시간을 잘 가지면서 충분한 휴식과 수면을 취한 학생일수록 학업성적이 높다는 것은 과학적으로 증명된 사실입니다.</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                <br></br>
                  <Table>
                    <tbody>
                      <tr>
                        <td className="font" colSpan={2}>
                          - 이번주 운동 및 스트레칭은 잘하고 있나요?
                        </td>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>            
                      </tr>
                      <tr>
                        <td className="font" colSpan={2}>
                          - 이번주 학업시간은 만족하시나요?
                        </td>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        
                        
                      </tr>
                      <tr>
                        <td className="font" colSpan={2}>
                          - 이번주 수면의 시간은 부족하지는 않은가요?
                        </td>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        
                        
                      </tr>
                      <tr>
                        <td className="font" colSpan={2}>
                        - 이번주 여가시간은 적절하게 즐겼나요?
                        </td>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        
                        
                      </tr>
                      <tr>
                        <td className="font" colSpan={2}>
                          - 이번주 식사는 적당한 속도로 먹었나요?
                        </td>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>                                              
                      </tr>                      
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats font">
                <i className="fas fa-check"></i>
                  일주일마다 초기화
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Main;