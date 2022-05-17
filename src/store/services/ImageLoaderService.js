import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../firebase';

export const imageLoaderAPI = createApi({
  reducerPath: 'imageLoaderAPI',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    loadImageToServer: build.mutation({
      queryFn: async (file) => {
        try {
          const response = await uploadBytes(ref(storage, 'posts'), file);
          console.log(response)
          return "Создано!";
        } catch (error) {
          console.log(error)
          return { error: error.code };
        }
      }
    }),
  })
});