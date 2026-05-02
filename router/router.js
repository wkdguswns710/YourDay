const express = require("express");
const router = express.Router();
const mysql = require("mysql2"); //설치한 mysql기능
const { join } = require("path");
//사용자가 보낸 값이 post방식일때 분석해주는 express기능

const path = require("path");

let conn = mysql.createConnection({
  // DB 정보
  host: "localhost",
  user: "mysql",
  password: "1234",
  port: "3306",
  database: "yourday",
  dateStrings: "date"
});

// 메인페이지 심박수
router.post('/Dashboard1', (req,res) => {
	
    let sql = 'SELECT DATE(vital_time) date, ROUND(avg(vital_v),1) heart FROM vital WHERE vital_time BETWEEN DATE_ADD(NOW(), INTERVAL -7 day ) AND NOW() GROUP BY date'
        conn.query(sql, (err, data) => {
        if(!err) {
            console.log("심박수 쿼리 성공")
            res.send(data)
        } else {
            console.log(err)
            res.send(err)
        }
    })
});

// 메인페이지 심박변위
router.post('/Dashboard2', (req,res) => {

  
  let sql = 'SELECT DATE(stress_time) st, ROUND(avg(stress_v),1) stress FROM test_vital_ch WHERE stress_time BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() GROUP BY st'
      conn.query(sql, (err, data) => {
        if(!err) {
            console.log("심박변위 쿼리 성공")
            res.send(data)
        } else {
            console.log(err)
            res.send(err)
        }
    })
});

// 메인페이지 운동량
router.post('/Dashboard3', (req,res) => {
    let sql = 'SELECT DATE(extime_time) et, sum(extime_v) ext FROM extime WHERE extime_time BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() GROUP BY et'
    conn.query(sql, (err, data) => {
      if(!err) {
          console.log("운동량 쿼리 성공")
          res.send(data)
      } else {
          console.log(err)
          res.send(err)
      }
   })
});

// 메인페이지 안정시 심박수
router.post('/Dashboard7', (req,res) => {

  let sql = 'SELECT DATE(rest_time) rt, ROUND(avg(rest_v),1) rest FROM rest_vital WHERE rest_time BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() GROUP BY rt'
      conn.query(sql, (err, data) => {
        if(!err) {
            console.log("심박수 쿼리 성공")
            res.send(data)
        } else {
            console.log(err)
            res.send(err)
        }
    })
});

// 메인페이지 오늘 만족도(막대)
router.post('/Dashboard4', (req,res) => {
  let sql = 'SELECT DATE(Date) AS `dayhappy`, avg(sleep) dsleep, avg(goback) dgoback, avg(study) dstudy, avg(eat) deat, avg(exe) dexe, avg(play) dplay FROM test_happy WHERE DATE(Date) = DATE(NOW()) GROUP BY Date'
  conn.query(sql, (err, data) => {
    if(!err) {
        console.log("오늘 만족도(막대) 쿼리 성공")
        // res.send(data)
        res.json(data)
    } else {
        console.log(err)
        res.send(err)
    }
 })
});

// 메인페이지 어제 만족도(막대)
router.post('/Dashboard5', (req,res) => {
  let sql = 'SELECT DATE(Date) dayhappy, avg(sleep) ysleep, avg(goback) ygoback, avg(study) ystudy, avg(eat) yeat, avg(exe) yexe, avg(play) yplay FROM test_happy WHERE DATE(Date) = CURDATE() - INTERVAL 1 DAY GROUP BY dayhappy'
  conn.query(sql, (err, data) => {
    if(!err) {
        console.log("어제 만족도(막대) 쿼리 성공")
        res.send(data)
    } else {
        console.log(err)
        res.send(err)
    }
 })
});

// 메인페이지 주간 만족도(파이)
router.post('/Dashboard6', (req,res) => {
  let sql = 'SELECT DATE(Date) weekhappy, avg(sleep) wsleep, avg(goback) wgoback, avg(study) wstudy, avg(eat) weat, avg(exe) wexe, avg(play) wplay FROM test_happy WHERE Date BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK ) AND NOW() GROUP BY `weekhappy`'
  conn.query(sql, (err, data) => {
    if(!err) {
        console.log("주간 만족도(파이) 쿼리 성공")
        res.send(data)
    } else {
        console.log(err)
        res.send(err)
    }
 })
});

// 캘린더 DB에서 업로드 날짜 가져오기
router.post('/uploadDate', (req,res) => {
  let arr_date=[];
  let id = req.body.id;

  let sql = 'SELECT upload_date FROM calendar_upload WHERE id = ?'
  conn.query(sql, [id], function (err, rows) {
    if (!err) {
      // err에 아무런 값이 없으면
      if (rows == "undefind") {
        uploadDate = "undefind";
      } else {
        for(let i=0; i<rows.length; i++){
          arr_date.push(rows[i].upload_date)
        };
        console.log("router 성공" + arr_date);
      }
      res.json(arr_date);
    } else {
      console.log("router 실패" + rows);
    }
  });
});




//Day_Data에서 데이터 가져오는 router
router.post("/take_day_data", (req, res) => {
  // view (React) => router로 데이터 보내기
  console.log("라우터 데이터=> day_data 정보 가져오기 : ", req.body);

  console.log("db 전 : ", req.body);

  let sql = "select * from member where id = ? and pw = ?";
  conn.query(sql, [id, pw], function (err, rows) {
    if (!err) {
      // err에 아무런 값이 없으면
      console.log("router 성공 : ", rows);
      if (rows == "undefind") {
        user_data = "undefind";
      } else {
        user_data = rows[0];
      }
      // router => View (React)로 데이터 보내기
      res.json(user_data);
    } else {
      console.log("router 실패" + rows[0]);
    }
  });
});

// DAY_DATA => 사용자가 선택한 날짜 행복 점수, 일기 내용 testday_data에서 가져오기
router.post("/day_data", function (req, res) {
  let ids = req.body.id;
  let daily_date = req.body.selectDay;
  let sql = "select * from test_happy where Date = ? and id = ?";
  conn.query(sql, [daily_date, ids], function (err, rows) {
    if (!err) {
      console.log("선택한 날짜 확인(sql문 후) 123123123 : ", rows[0]);
      res.json(rows[0]);
    } else {
      console.log("아이디 : ",id);
      console.log("날짜 : ", daily_date);
      console.log("day_data route 쪽 sql문 후 에러");
    }
  });
});

// day_data : 심박수 데이터 요청
router.post("/vital",function(req,res){
  // console.log("vital 라우터 실행")
  // let id = req.body.id;
  let selectDay = req.body.selectDay;
  // console.log("js에서 보낸 selectDay 값 : ",selectDay);
  let sql = "select hour(vital_time) as hours, avg(vital_v) as hearts from vital where vital_time like ? group by hours";
  conn.query(sql,[selectDay],function(err,rows){
    if(!err){
      // console.log("sql문 실행 이후 성공 : ", rows);
      let hour = [];
      let heart = [];
      for (let i = 0; i<rows.length; i++){
        hour[i] = rows[i].hours+"시";
        let ex = (rows[i].hearts).split(".");
        heart[i] = ex[0];
      }
      // console.log("hour", hour);
      // console.log("heart", heart);
      let result = {s:hour, v:heart}
      res.json(result)
    }else{
      console.log(err.code)
      console.log("vital : sql문 실행 이후 실패");
    }
  });
});

// 운동시간 데이터 요청
router.post("/extime",function(req,res){
  console.log("extime 라우터 실행")
  // let id = req.body.id;
  let selectDay = req.body.selectDay;
  console.log("js에서 보낸 selectDay 값 : ",selectDay);
  let sql = "select hour(extime_time) as m, sum(extime_v) as extime_hearts from extime where extime_time like ? group by m";
  conn.query(sql,[selectDay],function(err,rows){
    if(!err){
      console.log("extime sql문 실행 이후 성공 : ", rows);
      let extime_hour = [];
      let extime_v = [];
      for (let i = 0; i<rows.length; i++){
        extime_hour[i] = rows[i].m+"시";
        extime_v[i] = rows[i].extime_hearts;
      }
      console.log("hour", extime_hour);
      console.log("heart", extime_v);
      let result = {s:extime_hour, v:extime_v}
      res.json(result)
    }else{
      console.log(err.code)
      console.log("extime : sql문 실행 이후 실패");
    }
  });
});

// day_data : 심박변이 데이터 요청
router.post("/vital_change",function(req,res){
  console.log("vital_change 라우터 실행")
  // let id = req.body.id;
  let selectDay = req.body.selectDay;
  console.log("js에서 보낸 selectDay 값 : ",selectDay);
  let sql = "select hour(stress_time) as s_hours, avg(stress_v) as s_heart from test_vital_ch where stress_time like ? group by s_hours";
  conn.query(sql,[selectDay],function(err,rows){
    if(!err){
      // console.log("sql문 실행 이후 성공 : ", rows);
      let hour = [];
      let heart = [];
      for (let i = 0; i<rows.length; i++){
        hour[i] = rows[i].s_hours+"시";
        let ex = (rows[i].s_heart).split(".");
        heart[i] = ex[0];
      }
      console.log("test_vital_ch =>hour", hour);
      console.log("test_vital_ch =>heart", heart);
      let result = {s:hour, v:heart}
      res.json(result)
    }else{
      console.log(err.code)
      console.log("test_vital_ch : sql문 실행 이후 실패");
    }
  });
});

// 오늘 행복도 점수 
router.post("/dashboard_happy_point_today", function (req, res) {
  // let id = req.body.id;
  let daily_data = req.body.today;
  let sql = "select * from testday_data where daily_date = ?";
  conn.query(sql, [daily_data], function (err, rows) {
    if (!err) {
      console.log("선택한 날짜 확인(sql문 후) : ", rows[0]);
      res.json(rows[0]);
    } else {
      console.log("today : ", daily_data);
      console.log("today route 쪽 sql문 후 에러");
    }
  });
});

//로그인시 데이터 이동
router.post("/LoginData", (req, res) => {
  // view (React) => router로 데이터 보내기
  console.log("라우터 데이터=> 로그인 : ", req.body);
  let id = req.body.id;
  let pw = req.body.pw;
  console.log("db 전 : ", req.body);
  let user;
  let sql = "select * from member where id = ? and pw = ?";
  conn.query(sql, [id, pw], function (err, rows) {
    if (!err) {
      // err에 아무런 값이 없으면
      console.log("router 성공 : ", rows[0]);
      // rows[0]
      user=rows[0];
      // router => View (React)로 데이터 보내기
      res.json(user);
    } else {
      console.log("router 실패" + rows[0]);
    }
  });
});

//회원가입시 데이터 이동
router.post("/joindata", (req, res) => {
  console.log('Test')
  // view (React) => router로 데이터 보내기
  console.log("joinDate경로 req.body 확인 : ", req.body);
  let id = req.body.id;
  let pw = req.body.pw;
  let nick = req.body.nick;
  let gender = req.body.gender;
  let birthday = req.body.birthday;
  let phoneNumber = req.body.phoneNumber;

  let sql = "insert into member values(?, ?, ?, ?, sysdate(), ?, ?)";
  
  conn.query(
    sql,
    [id, pw, nick, gender, birthday, phoneNumber],
    function (err, rows) {
      if (!err) {
        // err에 아무런 값이 없으면
        console.log("데이터 입력 성공 부분, test")

        res.json({
          id:id,
          pw:pw,
          nick:nick,
          gender:gender,
          birthday:birthday,

        });

        // res.redirect("/")
      } else {
        console.log("입력실패, " + err.code);

      }
    }
  );

  // router => View (React)로 데이터 보내기
  // res.json(user);
});

// 마이페이지 - 이름 몇 성별 변경
router.post("/Update", function(req, res){

  let id = req.body.id;  
  let nick = req.body.nick;  
  let gender = req.body.gender;  

  console.log("회원정보 수정 중...")

  let sql = "update member set nick = ?, gender = ? where id = ? "

  conn.query(sql,[nick, gender, id], function (err, rows) {
      if (!err) {
        console.log("이름, 성별 수정성공")
        res.send({
          suc : "성공성공"
        })
      } else {
        console.log("이름, 성별 수정실패" + err.code);
      }
    }
  );
});

// 마이페이지 - 비밀번호 변경
router.post("/UpdatePW",function(req,res){

  let id = req.body.id;
  let pw = req.body.pw1;
  
  console.log("비밀번호 변경중..",id)
  console.log("기존 비밀번호", pw)

  let sql = "update member set pw = ? where id = ?"

    conn.query(sql,[pw, id], function(err,rows){
      if(!err){
          console.log("비밀번호 수정 성공!!", rows[0]);
          res.send({
            suc : "성공성공"
          })
      } else{
        console.log("비밀번호 변경 실패" + err.code);
      }
    });
});

// 마이페이지 - 회원탈퇴
router.post("/Delete", function(req,res){
  
  let id = req.body.id;

  console.log("회원탈퇴진행중..")
  let sql = "delete from member where id = ?"

  conn.query(sql,[id], function(err,rows){
    if(!err){
      console.log("회원탈퇴 성공이라고욘")
      res.redirect("http://localhost:3000/")
    }else{
      console.log("회원탈퇴 실패" + err);
    }
  });
});

// 아이디 중복 체크
router.post("/check_id", (req, res) => {
  console.log("db 전 사용자가 보낸 값 : ", req.body);
  let id = req.body.id;

  let sql = "select * from member where id = ?";
  conn.query(sql, [id], function (err, rows) {
    // 아이디 중복이 없다면
    console.log("sql문 후 출력 값 : ", rows[0]);
    let result;
    if (!err) {
      if (rows[0] == undefined) {
        result = "아이디 중복x";
        res.json({ result });
      } else {
        result = "아이디 중복o";
        res.json({ result });
      }
    } else {
      console.log("서버 db 에러");
    }
  });
});

// 휴대폰 번호 중복 체크
router.post("/check_phone_number", (req, res) => {
  console.log("db 전 사용자가 보낸 값 : ", req.body);
  let phoneNumber = req.body.phoneNumber;

  let sql = "select * from member where phoneNumber = ?";
  conn.query(sql, [phoneNumber], function (err, rows) {
    // 아이디 중복이 없다면
    console.log("sql문 후 출력 값 : ", rows[0]);
    let result;
    if (!err) {
      if (rows[0] == undefined) {
        result = "휴대폰 번호 중복x";
        res.json({ result });
      } else {
        result = "휴대폰 번호 중복o";
        res.json({ result });
      }
    } else {
      console.log("서버 db 에러");
    }
  });
});

// 아이디 및 비밀번호 찾기
router.post("/find_id_pw", (req, res) => {
  // view (React) => router로 데이터 보내기
  console.log("라우터 데이터=> 찾기 : ", req.body);
  let phoneNumber = req.body.phoneNumber;
  // let question = req.body.question;
  // let answer = req.body.answer;
  console.log("db 전 : ", req.body.phonNumber);
  let sql =
    "select id, pw from member where phoneNumber = ?";
  conn.query(sql, [phoneNumber], function (err, rows) {
    if (!err) {
      console.log(phoneNumber + "test");
      // err에 아무런 값이 없으면
      console.log("sql 성공 : ", rows);

      if (rows[0] != undefined) {
        console.log("값 있음 : ", rows[0]);
        let user_data = rows[0];
        res.json({ user_data });
      } else {
        console.log("sql한 데이터 값 없음 : ", rows[0]);
        let user_data = rows[0];
        res.json({ user_data });
      }
      // router => View (React)로 데이터 보내기
    } else {
      console.log("sql 실패");
    }
  });
});

router.get("*", function (request, response) {
  console.log("Happy Hacking!");
  response.sendFile(
    path.join(__dirname, "..", "build", "index.html")
  );
});

module.exports = router;
