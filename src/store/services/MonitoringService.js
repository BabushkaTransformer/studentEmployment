import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { db } from '../../firebase';
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import 'moment/locale/ru';
import moment from 'moment';

moment.locale('ru');

export const monitoringAPI = createApi({
  reducerPath: 'monitoringAPI',
  baseQuery: fetchBaseQuery({}),
  tagTypes: ['Groups', 'Students'],
  endpoints: (build) => ({
    getStudents: build.query({
      queryFn: async (id) => {
        const students = [];
        let ref = null;
        if (id) {
          ref = query(
            collection(db, 'students'),
            where("group", "==", id),
            orderBy("createdAt", "desc")
          );
        } else {
          ref = query(collection(db, 'students'));
        }

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
      },
      providesTags: ['Students']
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
      },
      invalidatesTags: ['Students']
    }),
    updateStudent: build.mutation({
      queryFn: async (data) => {
        try {
          await updateDoc(doc(db, 'students', data.id), data);
          return 'Сохранено!';
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ['Students']
    }),
    deleteStudent: build.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, 'students', id));
          return 'Удалено!';
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ['Students']
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
    getGroupById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'groups', id);
        try {
          const response = await getDoc(docRef);
          const createdAt = moment(response.data().createdAt.seconds * 1000).fromNow();
          return { data: { id: response.id, ...response.data(), createdAt } };
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