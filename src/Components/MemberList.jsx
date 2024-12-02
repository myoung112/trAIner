import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/MemberList.css';

function MemberList() {
  const history = useHistory();
  const [memberData, setMemberData] = useState([]);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/user/info/list'); 
        if (Array.isArray(response.data)) {
          setMemberData(response.data);
        } else {
          setMemberData([]);
        }
      } catch (error) {
        console.error('There was an error!', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
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
          <div className="smalltitle">회원 정보 조회</div>
          <div className="big-box">
            <div className="listname">
              <span>회원번호</span>
              <span>이름</span>
              <span>아이디</span>
              <span>선호 운동 부위</span>
              <span>수행능력</span>
            </div>
            {memberData.map(member => (
              <Link
                to={{
                  pathname: `/Member/${member.memberNum}`,
                  state: { memberData: member }
                }}
                key={member.memberNum}
                className="member-link"
              >
                <div className="small-box">
                  <span>{member.memberNum}</span>
                  <span>{member.memberName}</span>
                  <span>{member.memberId}</span>
                  <span>{member.memberArea}</span>
                  <span>{member.memberAbility}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberList;
