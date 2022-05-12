import React from 'react';
import { Routes, Route } from 'react-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUid, setUser } from './store/slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { Vacancies } from './pages/vacancy/Vacancies';
import { VacancyDetail } from './pages/vacancy/VacancyDetail';
import { CreateVacancy } from './pages/vacancy/CreateVacancy';
import { Authorization } from './pages/Authorization';
import { Profile } from './pages/Profile';

import {
  POST_CREATE_ROUTE_PATH, POST_DETAIL_ROUTE_PATH,
  POSTS_ROUTE_PATH, RESUME_CREATE_ROUTE_PATH, RESUME_ROUTE_PATH,
  VACANCY_CREATE_ROUTE_PATH,
  VACANCY_DETAIL_ROUTE_PATH,
  VACANCY_ROUTE_PATH
} from './constants';
import { authAPI } from './store/services/AuthService';
import { AllPosts } from './pages/forum/AllPosts';
import { CreatePost } from './pages/forum/CreatePost';
import { PostDetail } from './pages/forum/PostDetail';
import { CreateResume } from './pages/resume/CreateResume';

function App() {
  const dispatch = useDispatch();
  const [currentUid, setCurrentUid] = React.useState();
  const { data } = authAPI.useGetUserProfileQuery(currentUid, { skip: !currentUid });

  React.useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      dispatch(setUid(currentUid));
    }
  }, [data]);

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setCurrentUid(user.uid);
    }
  });

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/login' element={<Authorization/>}/>
        <Route element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path={VACANCY_ROUTE_PATH} element={<Vacancies/>}/>
          <Route path={VACANCY_DETAIL_ROUTE_PATH} element={<VacancyDetail/>}/>
          <Route path={VACANCY_CREATE_ROUTE_PATH} element={<CreateVacancy/>}/>

          <Route path={POSTS_ROUTE_PATH} element={<AllPosts/>}/>
          <Route path={POST_DETAIL_ROUTE_PATH} element={<PostDetail/>}/>
          <Route path={POST_CREATE_ROUTE_PATH} element={<CreatePost/>}/>

          <Route path={RESUME_CREATE_ROUTE_PATH} element={<CreateResume/>}/>

          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
