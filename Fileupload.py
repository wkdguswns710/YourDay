from flask import Flask, render_template, request, redirect
from werkzeug.utils import secure_filename
from datetime import datetime
import re
import pandas as pd
import pymysql
from sqlalchemy import create_engine
pymysql.install_as_MySQLdb()

dt_now = datetime.now()

app = Flask(__name__)
#
# 파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file():
    # Web에서 post 방식으로 보냈으면
    if request.method == 'POST':
        id = request.form['id']
        day = request.form['day']

        date = day
        year = date[0:4]
        month = date[5:7]
        day1 = date[-2:]
        if month[1] == '-' :
            month = '0'+ month[0]
        if day1[0] == '-' :
            day1 = '0'+ day1[1]
        date = year+'-'+month+'-'+day1

        # Modal에서 받은 행복도
        sleep = request.form['sleep']
        goback = request.form['goback']
        study = request.form['study']
        eat = request.form['eat']
        exe = request.form['exercise']
        play = request.form['play']
        diary = request.form['diary']
        
        data = {
            'sleep' : [sleep],
            'goback' : [goback],
            'study' : [study],
            'eat' : [eat],
            'exe' : [exe],
            'play' : [play],
            'diary' : [diary],
            'id' : [id],
            'Date' : [date]
        }

        df_day = pd.DataFrame(data)
        print(df_day)
        
        # Modal에서 받은 엑셀파일
        f = request.files['file']
        if f:
            # 저장할 경로 + 파일명
            f.save("./uploads/"+id+"."+secure_filename(f.filename))
            # 파일경로
            file_path = f'./uploads/{id}.xml'

            # 심박수
            df = pd.DataFrame([], columns=['vital_time', 'vital_v', 'id'])
            print(date)
            pattern = '^.*IdentifierHeartRate".*startDate="('+str(date)+'.{9}).*value="([0-9]*).*$'
            print(pattern)

            with open(file_path, 'r', encoding="UTF-8") as f:
                for line in f:
                    search = re.search(pattern, line)
                    #print(search)
                    if search is not None:
                        data = {
                            'vital_time': [search.group(1)],
                            'vital_v': [search.group(2)],
                            'id' : [id]
                        }
                        df = pd.DataFrame(data)
            df.vital_time = pd.to_datetime(df.vital_time)
            df.vital_v = pd.to_numeric(df.vital_v)
            df.head()
            df['vital_v'] = df['vital_v'].astype('int')
            print(df)

            # 심박변이
            df1 = pd.DataFrame([], columns=['stress_time', 'stress_v', 'id'])
            pattern = '^.*HKQuantityTypeIdentifierHeartRateVariabilitySDNN".*startDate="('+str(date)+'.{9}).*value="([0-9]*).*$'

            with open(file_path, 'r', encoding="UTF-8") as f:
                for line in f:
                    search = re.search(pattern, line)
                    if search is not None:
                        data = {
                          'stress_time': [search.group(1)],
                            'stress_v': [search.group(2)],
                            'id' : [id]
                        }
                        df1 = pd.DataFrame(data)

            df1.stress_time = pd.to_datetime(df1.stress_time)
            df1.stress_v = pd.to_numeric(df1.stress_v)

            df1.head()

            df1['stress_v'] = df1['stress_v'].astype('int')

            print(df1)

            # 운동시간
            dfexe = pd.DataFrame([], columns=['extime_time', 'extime_v', 'id'])

            pattern = '^.*HKQuantityTypeIdentifierAppleExerciseTime".*startDate="('+str(date)+'.{9}).*value="([0-9]*).*$'
            
            with open(file_path, 'r', encoding="UTF-8") as f:
                for line in f:
                    search = re.search(pattern, line)
                    if search is not None:
                        data = {
                            'extime_time': [search.group(1)],
                            'extime_v': [search.group(2)],
                            'id' : [id]
                        }
                        dfexe = pd.DataFrame(data)

            dfexe.extime_time = pd.to_datetime(dfexe.extime_time)
            dfexe.extime_v = pd.to_numeric(dfexe.extime_v)
            dfexe.head()
            dfexe['extime_v']=dfexe['extime_v'].astype('int')
            print(dfexe)

            # 휴식기 심박수
            dfrest = pd.DataFrame([], columns=['rest_time', 'rest_v', 'id'])

            pattern = '^.*IdentifierRestingHeartRate".*startDate="('+str(date)+'.{9}).*value="([0-9]*).*$'
            
            with open(file_path, 'r', encoding="UTF-8") as f:
                for line in f:
                    search = re.search(pattern, line)
                    if search is not None:
                        data = {
                            'rest_time': [search.group(1)],
                            'rest_v': [search.group(2)],
                            'id' : [id]
                        }
                        dfrest = pd.DataFrame(data)

            dfrest.rest_time = pd.to_datetime(dfrest.rest_time)
            dfrest.rest_v = pd.to_numeric(dfrest.rest_v)

            dfrest.head()

            dfrest['rest_v']=dfrest['rest_v'].astype('int')

            print(dfrest)

        # 캘린더 데이터 업로드 날짜
        data = {
            'id': [id],
            'upload_date': [date]
        }

        df_upload = pd.DataFrame(data)
        print(df_upload)

        # MySQL 연결
        engine = create_engine("mysql+pymysql://mysql:1234@localhost:3306/yourday")
        engine.connect()

        # DB 데이터 전송
        df_day.to_sql(name='test_happy', con=engine, if_exists='append', index=False)
        df_upload.to_sql(name='calendar_upload', con=engine, if_exists='append', index=False)
        if f:
            df.to_sql(name='vital', con=engine, if_exists='append', index=False)
            df1.to_sql(name='test_vital_ch', con=engine, if_exists='append', index=False)
            dfexe.to_sql(name='extime', con=engine, if_exists='append', index=False)
            dfrest.to_sql(name='rest_vital', con=engine, if_exists='append', index=False)
        
        return redirect("http://localhost:3000/admin/user/"+str(day))

    else : 
        return render_template('Calendar.js')


if __name__ == '__main__':
    # 서버 실행
    app.run(port='5000' ,debug = True)
