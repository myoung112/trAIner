import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/HistoryDetail.css';

function HistoryDetail() {
  const history = useHistory();
  const location = useLocation();
  const historyMemberNum = location.pathname.split('/').pop();

  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/history/detail/${historyMemberNum}`);
        const data = response.data;

        // Assuming the data has year, month, day fields
        if (data.year && data.month && data.day) {
          data.history_date = `${data.year}.${String(data.month).padStart(2, '0')}.${String(data.day).padStart(2, '0')}`;
        } else {
          data.history_date = 'Unknown date';
        }

        setHistoryData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [historyMemberNum]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !historyData) {
    return <div>Error: Failed to load history data.</div>;
  }

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
          <div className="box"></div>
          <div className="detailtitle">기록 상세 정보</div>
          <div className="detailtext-hi">
            {historyData.member_id} 님의 상세 정보
          </div>
          <table className="detail-table-hi">
            <tbody>
              <tr>
                <td>회원번호</td>
                <td>{historyData.history_member_num}</td>
                <td>아이디</td>
                <td>{historyData.member_id}</td>
              </tr>
              <tr>
                <td>운동명</td>
                <td>{historyData.ex_name}</td>
                <td>기록일</td>
                <td>{historyData.history_date}</td>
              </tr>
              <tr>
                <td>운동 횟수</td>
                <td>{historyData.ex_cnt}</td>
                <td>운동 강도</td>
                <td>{historyData.ex_intensity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetail;
