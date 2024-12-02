import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; 
import '../CSS/AIUpdate.css';

function AIUpdate() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const handleAiUploadClick = async () => {
    try {
      await axiosInstance.get('/api/admin/ai-management/new-version');
      history.push('/AIUpload');
    } catch (error) {
      console.error('새로운 버전 생성 페이지 폼 요청 실패:', error);
      alert('새로운 버전 생성 페이지를 불러오는 데 실패했습니다.');
    }
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
            <Link to={"/AIManage"}>
              <img src={"/image/arrow2.png"} alt="" className="arrow" />
            </Link>
          </header>
        </div>
        <div className="AIuptitle">AI 업데이트</div>
        <div className="rectangle-a">
          <div onClick={handleAiUploadClick}>
            <img src={"/image/ai-upload.png"} alt="" className="img-upload" />
          </div>
          <Link to={"/AIVersion"}>
            <img src={"/image/ai-version.png"} alt="" className="img-version" />
          </Link>
          <Link to={"/AIVersionchange"}>
            <img src={"/image/ai-change.png"} alt="" className="img-change" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AIUpdate;
