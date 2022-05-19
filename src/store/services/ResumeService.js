import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { db } from '../../firebase';
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  addDoc
} from 'firebase/firestore';
import 'moment/locale/ru';
import moment from 'moment';

moment.locale('ru');

export const resumeAPI = createApi({
  reducerPath: 'resumeAPI',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getAllResume: build.query({
      queryFn: async (id) => {
        const allResume = [];
        const ref = query(collection(db, 'resume'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            allResume.push({ id: doc.id, ...doc.data() });
          });
          return { data: allResume }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    getResumeById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'resume', id);
        try {
          const response = await getDoc(docRef);
          const createdAt = moment(response.data().createdAt.seconds * 1000).fromNow();
          return { data: { id: response.id, ...response.data(), createdAt } }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    createResume: build.mutation({
      queryFn: async (vacancy) => {
        try {
          await addDoc(collection(db, 'resume'), vacancy);
          return 'Создано!';
        } catch (error) {
          return { error: error.code };
        }
      }
    })
  })
});