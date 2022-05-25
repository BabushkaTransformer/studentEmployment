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

export const monitoringAPI = createApi({
  reducerPath: 'monitoringAPI',
  baseQuery: fetchBaseQuery({}),
  tagTypes: ['Groups'],
  endpoints: (build) => ({
    getStudents: build.query({
      queryFn: async () => {
        const students = [];
        const ref = query(collection(db, 'students'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().createdAt.seconds * 1000).format('DD MMMM YYYY');
            students.push({ id: doc.id, ...doc.data(), createdAt });
          });
          return { data: students };
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
    getGroups: build.query({
      queryFn: async () => {
        const groups = [];
        const ref = query(collection(db, 'groups'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().createdAt.seconds * 1000).format('DD MMMM YYYY');
            groups.push({ id: doc.id, ...doc.data(), createdAt });
          });
          return { data: groups };
        } catch (error) {
          return { error: error.code };
        }
      },
      providesTags: ['Groups']
    }),
    getStudentById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'students', id);
        try {
          const response = await getDoc(docRef);
          const createdAt = moment(response.data().createdAt.seconds * 1000).fromNow();
          return { data: { id: response.id, ...response.data(), createdAt } };
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
    createStudent: build.mutation({
      queryFn: async (data) => {
        try {
          await addDoc(collection(db, 'students'), data);
          return 'Создано!';
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
    createGroup: build.mutation({
      queryFn: async (data) => {
        try {
          await addDoc(collection(db, 'groups'), data);
          return 'Создано!';
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ['Groups']
    })
  })
});