import React from 'react';
import { Routes, Route } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUid, setUser, setIsLoading } from './store/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
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
import { CreateStudentModal } from './components/monitoring/CreateStudentModal';
import { AdminPage } from './pages/AdminPage';
import { Students } from './pages/monitoring/Students';
import { Groups } from './pages/monitoring/Groups';
import { Group } from './pages/monitoring/Group';
import { Graduate } from './pages/monitoring/Graduate';
import { ResultPage } from './pages/ResultPage';
import { GraduateRegistration } from './pages/GraduateRegistration';
import { AllUsers } from './pages/AllUsers';
import { RequireAuth } from './components/RequireAuth';
import { PageLoader } from './components/ui/PageLoader';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const [getUserData] = authAPI.useLazyGetUserProfileQuery();

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        return dispatch(setIsLoading(false));
      }

      getUserData(user.uid)
        .then(response => {
          dispatch(setUser(response.data));
          dispatch(setUid(user.uid));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    });
  }, []);


  if (isLoading) {
    return (
      <div style={{ width: '100%', height: '95vh' }}>
        <PageLoader/>
      </div>
    );
  }

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/login" element={<Authorization/>}/>
        <Route path="/graduateRegistration" element={<GraduateRegistration/>}/>

        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path={VACANCY_ROUTE_PATH} element={<Vacancies/>}/>
          <Route path={VACANCY_DETAIL_ROUTE_PATH} element={<VacancyDetail/>}/>
          <Route path={POSTS_ROUTE_PATH} element={<AllPosts/>}/>
          <Route path={POST_DETAIL_ROUTE_PATH} element={<PostDetail/>}/>
          <Route path={RESUME_DETAIL_ROUTE_PATH} element={<ResumeDetail/>}/>
          <Route path={RESUME_ROUTE_PATH} element={<ResumeList/>}/>
          <Route path={EVENT_ROUTE_PATH} element={<Events/>}/>
          <Route path={EVENT_DETAIL_ROUTE_PATH} element={<Event/>}/>
          <Route path="/search-result" element={<ResultPage/>}/>

          <Route element={<RequireAuth allowedRoles={['user', 'instructor', 'admin']}/>}>
            <Route path={VACANCY_CREATE_ROUTE_PATH} element={<CreateVacancy/>}/>
            <Route path={POST_CREATE_ROUTE_PATH} element={<CreatePost/>}/>
            <Route path={RESUME_CREATE_ROUTE_PATH} element={<CreateResume/>}/>
            <Route path={PROFILE_ROUTE_PATH} element={<Profile/>}/>
          </Route>

          <Route element={<RequireAuth allowedRoles={['instructor', 'admin']}/>}>
            <Route path={EVENT_CREATE_ROUTE_PATH} element={<CreateEvent/>}/>
          </Route>
        </Route>

        <Route element={<AdminLayout/>}>
          <Route element={<RequireAuth allowedRoles={['instructor', 'admin']}/>}>
            <Route path={ADMIN_ROUTE_PATH} element={<AdminPage/>}/>
            <Route path={CREATE_STUDENT_ROUTE_PATH} element={<CreateStudentModal/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/group/:id" element={<Group/>}/>
            <Route path="/graduate/:id" element={<Graduate/>}/>
          </Route>

          <Route element={<RequireAuth allowedRoles={['admin']}/>}>
            <Route path="/users" element={<AllUsers/>}/>
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
