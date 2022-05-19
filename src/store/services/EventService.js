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
import 'moment/locale/ru';

moment.locale('ru');

export const eventAPI = createApi({
  reducerPath: 'eventAPI',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    getEvents: build.query({
      queryFn: async (id) => {
        const events = [];
        const ref = query(collection(db, 'events'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().createdAt.seconds * 1000).fromNow();
            events.push({ id: doc.id, ...doc.data(), createdAt });
          });
          return { data: events }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    getEventById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'events', id);
        try {
          const response = await getDoc(docRef);
          const createdAt = moment(response.data().createdAt.seconds * 1000).fromNow();
          return { data: { id: response.id, ...response.data(), createdAt } };
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    createEvent: build.mutation({
      queryFn: async (vacancy) => {
        try {
          await addDoc(collection(db, 'events'), vacancy);
          return 'Создано!';
        } catch (error) {
          return { error: error.code };
        }
      }
    })
  })
});