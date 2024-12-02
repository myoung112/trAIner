import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/ExList.css';

function ExList() {
  const history = useHistory();
  const [exData, setExData] = useState([]);

  useEffect(() => {
    const fetchExData = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/exercise/list');
        setExData(response.data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };
    fetchExData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  return (
    <div className="div">
      <div className="div-2">
        <div className="div-3">
          <header>
            <div className="titlenew">trAIner</div>
            <div className="logout" onClick={handleLogout}>
              <Link to="#" className="logout-link">logout</Link>
            </div>
          </header>
          <div className="exercisetitle">운동 목록</div>
        </div>
        <div className="lists">
          <nav>
            <Link to={"/MemberManagement"}>회원 관리</Link> <br /><br />
            <div className="ExerciseList">운동 목록 관리 <br /><br /></div>
            <Link to={"/RoutineManagement"}>루틴 관리</Link> <br /><br />
            <Link to={"/AIManage"}>AI 제어</Link> <br /><br />
          </nav>
        </div>
        <div className="big-box-ex">
          <div className="listname-ex">
            <span>운동번호</span>
            <span>분류</span>
            <span>운동명</span>
            <span>운동부위</span>
            <span>난이도</span>
          </div>
          {exData.map((ex) => (
            <Link
              to={{
                pathname: `/Ex/${ex.exNameEn}`,
                state: { ExData: ex }
              }}
              key={ex.exNameEn}
              className="ex-link"
            >
              <div className="small-box-ex">
                <span>{ex.exNum}</span>
                <span>{ex.exType}</span>
                <span>{ex.exName}</span>
                <span>{ex.exArea}</span>
                <span>{ex.exDifficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExList;
