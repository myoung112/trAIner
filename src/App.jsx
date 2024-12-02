import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Main from './Components/Main';
import MemberMNG from './Components/MemberMNG';
import MemberList from './Components/MemberList';
import MemberDetail from './Components/MemberDetail';
import MemberHistory from './Components/MemberHistory';
import HistoryDetail from './Components/HistoryDetail';
import ExList from './Components/ExList';
import ExListMNG from './Components/ExListMNG';
import ExListMod from './Components/ExListMod';
import RoutineMNG from './Components/RoutineMNG';
import AIManage from './Components/AIManage';
import AIUpdate from './Components/AIUpdate';
import AIUpload from './Components/AIUpload';
import AIVersion from './Components/AIVersion';
import AIVersionchange from './Components/AIVersionchange';

function App() {
  return (
    <Router>
      <div className="container">
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Main" component={Main} />
            <Route path="/MemberManagement" component={MemberMNG} />
            <Route path="/MemberList" component={MemberList} />
            <Route path="/Member/:member_num" component={MemberDetail} />
            <Route path="/MemberHistory" component={MemberHistory} />
            <Route path="/History/:history_member_num" component={HistoryDetail} />
            <Route path="/ExerciseList" component={ExList} />
            <Route path="/Ex/:ex_num" component={ExListMNG} />
            <Route path="/ExListModify/:ex_num" component={ExListMod} />
            <Route path="/RoutineManagement" component={RoutineMNG} />
            <Route path="/AIManage" component={AIManage} />
            <Route path="/AIUpdate" component={AIUpdate} />
            <Route path="/AIUpload" component={AIUpload} />
            <Route path="/AIVersion" component={AIVersion} />
            <Route path="/AIVersionchange" component={AIVersionchange} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
