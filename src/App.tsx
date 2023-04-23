import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Study, Document, Exercise, Profile, Forum } from './pages';
import { Login, Register, ResetPassword } from './pages/auth';
import { IndexStudy } from './pages/admin/manage_study';
// import Admin from './pages/admin';
// import { selectUserRole } from './redux/slice/authSlice';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase/config';
import PathDetail from './pages/admin/manage_study/PathDetail';

function App() {
  // const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [userRole, setUserRole] = useState('student');
  const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    if (userID)
      getAccount(userID).then((value) => {
        setUserRole(value);
      });
  }, [userID]);

  const getAccount = async (userID: string) => {
    const q = query(collection(db, 'accounts'), where('user_id', '==', userID));

    const role = await (await getDocs(q)).docs[0].data().role;
    return role;
  };

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
          </Routes>
        </BrowserRouter>
      )}
      {userRole === 'admin' && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<IndexStudy />} />
            <Route path='/login' element={<Login />} />
            <Route path='/path_detail/:id' element={<PathDetail />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
