import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/AIManage.css';

function AIManage() {
  const history = useHistory();
  const [aiVersion, setAiVersion] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAiVersion = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/ai-management/current-ai-info');
        setAiVersion(response.data); 
      } catch (error) {
        console.error('Error fetching AI version:', error);
        setError('Error fetching AI version');
      }
    };

    fetchAiVersion();
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
        </div>
        <div className="AItitle">AI 제어</div>
        <div className="lists">
          <nav>
            <Link to={"/MemberManagement"}>회원 관리</Link> <br /><br />
            <Link to={"/ExerciseList"}>운동 목록 관리</Link> <br /><br />
            <Link to={"/RoutineManagement"}>루틴 관리</Link> <br /><br />
            <div className="AIManage">AI 제어 <br /><br /></div>
          </nav>
        </div>
        <div className="rectangle-ai"></div>
        <div className="aitext">AI 현재 버전:
        
          <div className="listname-hi">
              <span>운동명</span>
              <span>시점</span>
              <span>버전</span>
            </div>
            {aiVersion.map(versionInfo => (
                <div className="small-box-hi">
                  <span>{versionInfo.exName}</span>
                  <span>{versionInfo.aspect}</span>
                  <span>{versionInfo.modelVersion}</span>
                </div>
            ))}
          
        </div>
        <Link to={"/AIUpdate"}>
          <img src={"/image/ai_re.png"} alt="" className="img-re2" />
        </Link>
      </div>
    </div>
  );
}

export default AIManage;
