import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Study, Document, Exercise, Profile, Forum } from './pages';
import { Login, Register, ResetPassword } from './pages/auth';
import CreateStudy from './pages/admin/manage_study';
// import Admin from './pages/admin';
// import { selectUserRole } from './redux/slice/authSlice';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase/config';

function App() {
  // const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [userRole, setUserRole] = useState('student');
  const userID = useSelector((state: RootState) => state.auth.userID);
  // console.log(userRole);
  console.log('user id' + userID);

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
            {/* <Route path='/admin' element={<CreateStudy />} /> */}
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      )}
      {userRole === 'admin' && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<CreateStudy />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
