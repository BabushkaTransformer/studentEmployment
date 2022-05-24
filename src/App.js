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
  ADMIN_ROUTE_PATH,
  CREATE_STUDENT_ROUTE_PATH,
  EVENT_CREATE_ROUTE_PATH,
  EVENT_DETAIL_ROUTE_PATH,
  EVENT_ROUTE_PATH,
  POST_CREATE_ROUTE_PATH,
  POST_DETAIL_ROUTE_PATH,
  POSTS_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  RESUME_CREATE_ROUTE_PATH,
  RESUME_DETAIL_ROUTE_PATH,
  RESUME_ROUTE_PATH,
  VACANCY_CREATE_ROUTE_PATH,
  VACANCY_DETAIL_ROUTE_PATH,
  VACANCY_ROUTE_PATH
} from './constants';

import { authAPI } from './store/services/AuthService';
import { AllPosts } from './pages/forum/AllPosts';
import { CreatePost } from './pages/forum/CreatePost';
import { PostDetail } from './pages/forum/PostDetail';
import { CreateResume } from './pages/resume/CreateResume';
import { ResumeDetail } from './pages/resume/ResumeDetail';
import { ResumeList } from './pages/resume/ResumeList';
import { Events } from './pages/event/Events';
import { Event } from './pages/event/Event';
import { CreateEvent } from './pages/event/CreateEvent';
import { AdminLayout } from './components/AdminLayout';
import { CreateStudent } from './pages/monitoring/CreateStudent';
import { AdminPage } from './pages/AdminPage';
import { Students } from './pages/monitoring/Students';

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
          <Route path={RESUME_DETAIL_ROUTE_PATH} element={<ResumeDetail/>}/>
          <Route path={RESUME_ROUTE_PATH} element={<ResumeList/>}/>

          <Route path={EVENT_ROUTE_PATH} element={<Events/>}/>
          <Route path={EVENT_DETAIL_ROUTE_PATH} element={<Event/>}/>
          <Route path={EVENT_CREATE_ROUTE_PATH} element={<CreateEvent/>}/>

          <Route path={PROFILE_ROUTE_PATH} element={<Profile/>}/>
        </Route>

        <Route element={<AdminLayout/>}>
          <Route path={ADMIN_ROUTE_PATH} element={<AdminPage/>}/>
          <Route path={CREATE_STUDENT_ROUTE_PATH} element={<CreateStudent/>}/>
          <Route path="/students" element={<Students/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
