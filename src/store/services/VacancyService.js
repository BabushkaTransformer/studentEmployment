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
import moment from 'moment';

moment.locale('ru');

export const vacancyAPI = createApi({
  reducerPath: 'vacancyAPI',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getVacancies: build.query({
      queryFn: async (id) => {
        const vacancies = [];
        const ref = query(collection(db, 'vacancies'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().createdAt.seconds * 1000).fromNow();
            vacancies.push({id: doc.id, ...doc.data(), createdAt});
          });
          return { data: vacancies }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    getVacancyById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'vacancies', id);
        try {
          const response = await getDoc(docRef);
          return { data: {id: response.id, ...response.data()} }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    createVacancy: build.mutation({
      queryFn: async (vacancy) => {
        try {
          await addDoc(collection(db, 'vacancies'), vacancy);
          return "Создано!";
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
  })
});