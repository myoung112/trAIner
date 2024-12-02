import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; 
import '../CSS/RoutineMNG.css';

function RoutineMNG() {
  const history = useHistory();
  const [rtData, setRtData] = useState([]);
  const [searchMemberId, setSearchMemberId] = useState('');

  useEffect(() => {
    fetchRoutineData();
  }, []);

  const fetchRoutineData = async (memberId = '') => {
    try {
      const response = await axiosInstance.get('/api/admin/routine/list', {
        params: { memberId }
      });
      setRtData(response.data);
    } catch (error) {
      console.error('Error fetching routine data:', error);
    }
  };

  const handleSearch = () => {
    fetchRoutineData(searchMemberId);
  };

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
          <div className="routinetitle">루틴 관리</div>
        </div>
        <div className="lists">
          <nav>
            <Link to={"/MemberManagement"}>회원 관리</Link> <br /><br />
            <Link to={"/ExerciseList"}>운동 목록 관리</Link> <br /><br />
            <div className="RoutineManagement">루틴 관리 <br /><br /></div>
            <Link to={"/AIManage"}>AI 제어</Link> <br /><br />
          </nav>
        </div>
        <div className="search-box-rt">
          <input
            type="text"
            value={searchMemberId}
            onChange={(e) => setSearchMemberId(e.target.value)}
            placeholder="회원 아이디 검색"
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <div className="big-box-rt">
          <div className="listname-rt">
            <span>루틴 이름</span>
            <span>생성된 날짜</span>
            <span>루틴 내용</span>
          </div>
          {rtData.map(rt => (
            <div className="small-box-rt" key={rt.routineName}>
              <span>{rt.routineName}</span>
              <span>{rt.CreationDate}</span>
              <span>{rt.routineJson}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoutineMNG;
