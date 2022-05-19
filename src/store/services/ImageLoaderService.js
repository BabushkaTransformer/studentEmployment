import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

export const imageLoaderAPI = createApi({
  reducerPath: 'imageLoaderAPI',
  baseQuery: fetchBaseQuery({}),
  endpoints: (build) => ({
    loadImageToServer: build.mutation({
      queryFn: async ({ file, place }) => {
        const currentRef = ref(storage, `${place}/` + file.name);
        try {
          await uploadBytes(currentRef, file);
          const url = await getDownloadURL(currentRef);
          return { data: url }
        } catch (error) {
          return { error: error.code };
        }
      }
    }),
  })
});