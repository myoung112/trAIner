import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; 
import '../CSS/MemberDetail.css';

function MemberDetail() {
  const history = useHistory();
  const location = useLocation();
  const initialMemberData = location.state?.memberData;

  const [memberData, setMemberData] = useState(initialMemberData || null);

  useEffect(() => {
    if (!initialMemberData) {
      const fetchMemberData = async () => {
        try {
          const response = await axiosInstance.get('/api/admin/user/info/detail'); 
          setMemberData(response.data);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      };
      fetchMemberData();
    }
  }, [initialMemberData]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  if (!memberData) {
    return <div>Loading...</div>; 
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
            <Link to="/MemberList">
              <img src="/image/arrow2.png" alt="" className="arrow" />
            </Link>
          </header>
          <div className="box"></div>
          <div className="detailtitle">회원 상세 정보</div>
          <div className="detailtext">
            {memberData.memberName} 님의 상세 정보
          </div>
          <table className="detail-table">
            <tbody>
              <tr>
                <td>회원번호</td>
                <td>{memberData.memberNum}</td>
                <td>이름</td>
                <td>{memberData.memberName}</td>
              </tr>
              <tr>
                <td>아이디</td>
                <td>{memberData.memberId}</td>
                <td>전화번호</td>
                <td>{memberData.memberTel}</td>
              </tr>
              <tr>
                <td>생년월일</td>
                <td>{memberData.memberBirth}</td>
                <td>성별</td>
                <td>{memberData.memberSex}</td>
              </tr>
              <tr>
                <td>신장/몸무게</td>
                <td>{memberData.memberHeight}/{memberData.memberWeight}</td>
                <td>선호 운동 부위</td>
                <td>{memberData.memberArea}</td>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>수행능력<br />(상/중/하)</td>
                <td>{memberData.memberAbility}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;
