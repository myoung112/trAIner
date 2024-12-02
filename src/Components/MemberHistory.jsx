import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/MemberHistory.css';

function MemberHistory() {
  const history = useHistory();
  const [historyData, setHistoryData] = useState([]);
  const [searchMemberId, setSearchMemberId] = useState('');

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async (memberId = '') => {
    try {
      const response = await axiosInstance.get('/api/admin/history', {
        params: { memberId }
      });
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  const handleSearch = () => {
    fetchHistoryData(searchMemberId);
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
            <Link to="/MemberManagement">
              <img src="/image/arrow2.png" alt="" className="arrow" />
            </Link>
          </header>
          <div className="smalltitle-hi">회원 기록 조회</div>
          <div className="search-box">
            <input
              type="text"
              value={searchMemberId}
              onChange={(e) => setSearchMemberId(e.target.value)}
              placeholder="회원 아이디 검색"
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <div className="big-box-hi">
            <div className="listname-hi">
              <span className="col-id">아이디</span>
              <span className="col-exname">운동명</span>
              <span className="col-recdate">기록일</span>
            </div>
            {historyData.map(history => (
              <Link
                to={{
                  pathname: `/History/${history.memberId}`,
                  state: { historyData: history }
                }}
                key={history.memberId}
                className="member-link"
              >
                <div className="small-box-hi">
                  <span className="col-id">{history.memberId}</span>
                  <span className="col-exname">{history.exName}</span>
                  <span className="col-recdate">{history.recDate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberHistory;
