import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../CSS/Main.css';

function Main() {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  useEffect(() => {
    axiosInstance.get('/api/admin/main')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          </header>
        </div>
        <div className="lists">
          <nav>
            <Link to={"/MemberManagement"}>회원 관리</Link> <br /><br />
            <Link to={"/ExerciseList"}>운동 목록 관리</Link> <br /><br />
            <Link to={"/RoutineManagement"}>루틴 관리</Link> <br /><br />
            <Link to={"/AIManage"}>AI 제어</Link> <br /><br />
          </nav>
        </div>
        <div className="rectangle"></div>
        <img src={"/image/admin.png"} alt="" className="img" />
        <div className="texts">
          어서오세요, 관리자 님!
          <br />
          <br />
          {data ? (
            <div>
              {/* <div>{JSON.stringify(data, null, 2)}</div> */}
            </div>
          ) : (
            "무엇을 도와드릴까요?"
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
