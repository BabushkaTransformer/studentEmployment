import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { db } from '../../firebase';
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  addDoc,
  where,
  orderBy,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/ru'

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({}),
  tagTypes: ['Comment'],
  endpoints: (build) => ({
    getPosts: build.query({
      queryFn: async (id) => {
        const posts = [];
        const ref = query(collection(db, 'posts'));
        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            moment.locale('ru')
            const createdAt = moment(doc.data().createdAt.seconds * 1000).fromNow();
            posts.push({id: doc.id, ...doc.data(), createdAt});
          });
          return { data: posts }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    getPostById: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'posts', id);
        try {
          const response = await getDoc(docRef);
          moment.locale('ru')
          const createdAt = moment(response.data().createdAt.seconds * 1000).fromNow();
          return { data: {id: response.id, ...response.data(), createdAt} }
        } catch (error) {
          return { error: error.code }
        }
      },
    }),
    createPost: build.mutation({
      queryFn: async (post) => {
        try {
          await addDoc(collection(db, 'posts'), post);
          return "Создано!";
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
    getComments: build.query(({
      queryFn: async (id) => {
        const ref = query(
          collection(db, 'comments'),
          where("postId", "==", id),
          orderBy("createdAt", "desc")
        );
        try {
          const querySnapshot = await getDocs(ref);
          const comments = querySnapshot.docs.map((doc) => {
            moment.locale('ru')
            const createdAt = moment(doc.data().createdAt.seconds * 1000).fromNow();
            return ({id: doc.id, ...doc.data(), createdAt});
          });
          return { data: comments }
        } catch (error) {
          return { error: error.code }
        }
      },
      providesTags: ["Comment"]
    })),
    createComment: build.mutation({
      queryFn: async (comment) => {
        try {
          await addDoc(collection(db, 'comments'), comment);
          return "Создано!";
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ["Comment"]
    }),
    updateComment: build.mutation({
      queryFn: async (comment) => {
        try {
          await updateDoc(doc(db, 'comments', comment.id), comment);
          return "Обновлено!";
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ["Comment"]
    }),
    deleteComment: build.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, 'comments', id));
          return "Удалено!";
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ["Comment"]
    }),
  })
});