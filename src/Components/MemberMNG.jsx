import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import axiosInstance from '../axiosInstance'; 
import '../CSS/MemberMNG.css';

function MemberMNG() {
  const history = useHistory();

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
          <div className="membertitle">회원 관리</div>
        </div>
        <div className="lists">
          <nav>
            <div className="MemberManagement">회원 관리 <br /><br /></div>
            <Link to="/ExerciseList">운동 목록 관리</Link> <br /><br />
            <Link to="/RoutineManagement">루틴 관리</Link> <br /><br />
            <Link to="/AIManage">AI 제어</Link> <br /><br />
          </nav>
        </div>
        <div className="rectangle-member"></div>
        <Link to="/MemberList">
          <img src="/image/memberlist2.png" alt="" className="img-li" />
        </Link>
        <Link to="/MemberHistory">
          <img src="/image/memberrecord2.png" alt="" className="img-re" />
        </Link>
      </div>
    </div>
  );
}

export default MemberMNG;
