import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/AIVersion.css';

function AIVersion() {
  const [currentAiVersion, setCurrentAiVersion] = useState('');
  const [currentAiInfoId, setCurrentAiInfoId] = useState(null); 
  const history = useHistory();

  useEffect(() => {
    const fetchCurrentAiInfo = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/ai-management/current-ai-info');
        if (response.data && response.data.length > 0) {
          setCurrentAiVersion(response.data[0].version);
          setCurrentAiInfoId(response.data[0].aiInfoId); 
        } else {
          setCurrentAiVersion('현재 적용된 AI 버전 정보가 없습니다.');
          setCurrentAiInfoId(null); 
        }
      } catch (error) {
        console.error('현재 적용된 AI 정보를 가져오는 중 오류 발생:', error);
        setCurrentAiVersion('현재 적용된 AI 버전 정보를 가져오는 데 실패했습니다.');
      }
    };
    fetchCurrentAiInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const handleDeleteAiVersion = async () => {
    try {
      if (currentAiInfoId) { 
        await axiosInstance.delete(`/api/admin/ai-info-delete/${currentAiInfoId}`);
        setCurrentAiVersion(''); 
        setCurrentAiInfoId(null); 
      }
    } catch (error) {
      console.error('AI 버전 삭제 중 오류 발생:', error);
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
            <Link to={"/AIUpdate"}>
              <img src={"/image/arrow2.png"} alt="" className="arrow" />
            </Link>
          </header>
        </div>
        <div className="AIuptitle">AI 버전 출력</div>
        <div className="rectangle-upload">
          <div className="versiontext">
            {currentAiVersion}
            {currentAiInfoId && ( 
              <button onClick={handleDeleteAiVersion} className="delete-button">
                삭제
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIVersion;
