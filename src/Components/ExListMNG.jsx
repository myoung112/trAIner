import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/ExListMNG.css';

function ExListMNG({ match }) {
  const { params: { exNameEn } } = match;
  const [ExData, setExData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchExData = async () => {
      try {
        const response = await axiosInstance.get(`/api/admin/exercise/detail/${exNameEn}`);
        setExData(response.data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };
    fetchExData();
  }, [exNameEn]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const handleModify = () => {
    history.push(`/ExListModify/${exNameEn}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/admin/exercise/delete/${exNameEn}`); 
      alert('운동 정보가 성공적으로 삭제되었습니다.');
      history.push('/ExerciseList');
    } catch (error) {
      console.error('운동 정보 삭제 중 오류 발생:', error);
      alert('운동 정보 삭제에 실패했습니다.');
    }
  };

  if (!ExData) {
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
            <Link to={"/ExerciseList"}>
              <img src={"/image/arrow2.png"} alt="" className="arrow" />
            </Link>
          </header>
          <div className="title-ex">운동 정보 관리</div>
          <button className="modify-ex" onClick={handleModify}>정보 수정</button>
          <button className="delete-ex" onClick={handleDelete}>정보 삭제</button>
          <div className="big-box-ex2">
            <div className="listname-ex2">
              <span>운동번호</span>
              <span>분류</span>
              <span>운동명</span>
              <span>운동부위</span>
              <span>난이도</span>
            </div>
            <div className="small-box-ex2">
              <span>{ExData.exNum}</span>
              <span>{ExData.exType}</span>
              <span>{ExData.exName}</span>
              <span>{ExData.exArea}</span>
              <span>{ExData.exDifficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExListMNG;
