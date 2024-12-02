import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/AIUpload.css';

function AIUpload() {
  const [exerciseName, setExerciseName] = useState('');
  const [viewType, setViewType] = useState('');
  const [version, setVersion] = useState('');
  const [file, setFile] = useState(null);
  const [aiInfoList, setAiInfoList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAiInfoList = async () => {
      try {
        const response = await axiosInstance.get('/api/admin/ai-info-list');
        setAiInfoList(response.data);
      } catch (error) {
        console.error('AI 정보 목록을 가져오는 중 오류 발생:', error);
      }
    };
    fetchAiInfoList();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!exerciseName || !viewType || !version || !file) {
      alert("모든 필드를 입력하고 파일을 첨부하세요.");
      return;
    }

    const formData = new FormData();
    formData.append('exName', exerciseName);
    formData.append('aspect', viewType);
    formData.append('modelVersion', version);
    formData.append('model', file);

    try {
      await axiosInstance.post('/api/admin/ai-management/new-version', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('파일 업로드 및 새로운 버전 생성 성공!');
      history.push('/AIUpdate');
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드 실패. 다시 시도해주세요.');
    }
  };

  const getUniqueOptions = (data, key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  const exerciseOptions = getUniqueOptions(aiInfoList, 'exerciseName');
  const viewTypeOptions = getUniqueOptions(aiInfoList, 'viewType');
  const versionOptions = getUniqueOptions(aiInfoList, 'version');

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
        <div className="AIuptitle">AI 업로드</div>
        <div className="rectangle-upload">
          <div>
            <label htmlFor="exerciseName">운동 이름:</label>
            <select
              id="exerciseName"
              value={exerciseName}
              onChange={handleExerciseNameChange}
              className="upload-select"
            >
              <option value="" disabled>운동 이름을 선택하세요</option>
              {exerciseOptions.map((exercise, index) => (
                <option key={index} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="viewType">정면/측면 여부:</label>
            <select
              id="viewType"
              value={viewType}
              onChange={handleViewTypeChange}
              className="version-select"
            >
              <option value="" disabled>정면 또는 측면</option>
              {viewTypeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="version">버전:</label>
            <select
              id="version"
              value={version}
              onChange={handleVersionChange}
              className="upload-input"
            >
              <option value="" disabled>버전을 선택하세요</option>
              {versionOptions.map((ver, index) => (
                <option key={index} value={ver}>
                  {ver}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file">파일 첨부 (H5):</label>
            <input 
              type="file" 
              id="file" 
              accept=".h5"
              onChange={handleFileChange} 
              className="upload-file"
            />
          </div>
          <div>
            <button onClick={handleUpload} className="upload-button">업로드</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIUpload;
