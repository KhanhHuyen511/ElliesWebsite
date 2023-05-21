import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import {
  Study,
  Document,
  Exercise,
  Profile,
  Forum,
  StudyDetail,
  DocDetail,
} from './pages';
import { Login, Register, ResetPassword } from './pages/auth';
import { IndexStudy, IndexDocument } from './pages/admin';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import PathDetail from './pages/admin/manage_study/PathDetail';

function App() {
  const [userRole, setUserRole] = useState('student');
  const userID = useSelector((state: RootState) => state.auth.userID);
  const uRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {
    if (userID) setUserRole(uRole);
  }, [userID, uRole]);

  return (
    <div className='app'>
      {userRole === 'student' && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Study />} />
            <Route path='/document' element={<Document />} />
            <Route path='/exercise' element={<Exercise />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/study_detail/:id' element={<StudyDetail />} />
            <Route path='/doc_detail/:id' element={<DocDetail />} />
          </Routes>
        </BrowserRouter>
      )}
      {userRole === 'admin' && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<IndexStudy />} />
            <Route path='/document' element={<IndexDocument />} />
            <Route path='/login' element={<Login />} />
            <Route path='/path_detail/:id' element={<PathDetail />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
