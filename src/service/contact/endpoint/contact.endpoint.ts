import { contactApi } from "./../service";

const contactEndPoint = contactApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: () => ({
        url: "contact",
        method: "GET",
      }),
      providesTags: ["contacts"],
    }),
    createContact: build.mutation({
      query: (data) => ({
        url: "contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetContactsQuery, useCreateContactMutation } =
  contactEndPoint;
