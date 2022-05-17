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
            allResume.push({id: doc.id, ...doc.data()});
          });
          return { data: allResume }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    getResumeById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'resume', id);
        try {
          const response = await getDoc(docRef);
          return { data: {id: response.id, ...response.data()} }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    createResume: build.mutation({
      queryFn: async (vacancy) => {
        try {
          await addDoc(collection(db, 'resume'), vacancy);
          return "Создано!";
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
  })
});