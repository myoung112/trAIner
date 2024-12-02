import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; 
import '../CSS/Login.css';

function Login() {
  const [loginData, setLoginData] = useState({
    memberId: '',
    memberPw: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/api/admin/login', {
        memberId: loginData.memberId,
        memberPw: loginData.memberPw
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        //localStorage.setItem('grantType', response.data.grantType);
        //localStorage.setItem('refreshToken', response.data.refreshToken);
        
        
        history.push('/Main');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        
        await axiosInstance.post('/api/admin/login/error', {
          memberId: loginData.memberId,
          error: 'Invalid credentials'
        });
      }
    } catch (error) {
      console.error('로그인 요청 오류:', error);
      setError('로그인 요청 중 오류가 발생했습니다.');
      
      await axiosInstance.post('/api/admin/login/error', {
        memberId: loginData.memberId,
        error: error.message
      });
    }
  };

  return (
    <div id="main-container" className="container">
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="title">trAIner</div>
            <div className="title2">AI trainer for you</div>

            <div className="text1">관리자 로그인</div>

            <div className="id">
              <div className="input-id">ID</div>
              <input
                type="text"
                className="input-box-login"
                name="memberId"
                value={loginData.memberId}
                onChange={handleInputChange}
              />
            </div>

            <div className="pw">
              <div className="input-pw">PASSWORD</div>
              <input
                type="password"
                className="input-box2-login"
                name="memberPw"
                value={loginData.memberPw}
                onChange={handleInputChange}
              />
            </div>

            <div className="login" onClick={handleLogin}>
              <Link to="#" className="login-link">LOGIN</Link>
            </div>

            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
