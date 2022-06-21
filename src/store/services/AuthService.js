import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import moment from 'moment';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({}),
  tagTypes: ['Profile', 'Users'],
  endpoints: (build) => ({
    signIn: build.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const response = await signInWithEmailAndPassword(getAuth(), email, password);
          return { data: response.user.uid }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    signUp: build.mutation({
      queryFn: async (user) => {
        const { firstName, lastName, email, password, company } = user;
        try {
          const response = await createUserWithEmailAndPassword(getAuth(), email, password);
          await setDoc(doc(db, 'users', response.user.uid), {
            firstName: firstName,
            lastName: lastName,
            patronymic: "",
            avatar: "",
            email: response.user.email,
            company: company,
            phone: "",
            telegram: "",
            role: 'user',
            id: response.user.uid,
            created: response.user.metadata.creationTime,
            updated: response.user.metadata.creationTime
          });
          return { data: response.user.uid }
        } catch (error) {
          return { error: error.code }
        }
      }
    }),
    signOut: build.mutation({
      queryFn: async () => {
        await signOut(getAuth());
      }
    }),
    getUserProfile: build.query({
      queryFn: async (id) => {
        const docRef = doc(db, 'users', id);
        try {
          const response = await getDoc(docRef);
          return { data: {id: response.id, ...response.data()} }
        } catch (error) {
          return { error: error.code }
        }
      },
      providesTags: ['Profile']
    }),
    updateUserProfile: build.mutation({
      queryFn: async (user) => {
       try {
         await updateDoc(doc(db, 'users', user.id), user);
         return "Сохранено!"
       } catch (error) {
         return { error: error.code };
       }
      },
      invalidatesTags: ['Profile']
    }),
    getUsers: build.query({
      queryFn: async () => {
        const users = [];

        const ref = query( collection(db, 'users'));

        try {
          const querySnapshot = await getDocs(ref);
          querySnapshot.forEach((doc) => {
            const createdAt = moment(doc.data().created.seconds * 1000).format('DD MMMM YYYY');
            users.push({ id: doc.id, ...doc.data(), createdAt });
          });
          return { data: users };
        } catch (error) {
          return { error: error.code };
        }
      },
      providesTags: ['Users']
    }),
    changeUserRole: build.mutation({
      queryFn: async ({ id, data }) => {
        try {
          await updateDoc(doc(db, 'users', id), data);
          return "Сохранено!"
        } catch (error) {
          return { error: error.code };
        }
      },
      invalidatesTags: ['Users']
    }),
  })
});