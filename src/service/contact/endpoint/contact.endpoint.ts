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
    deleteContact: build.mutation({
      query: (id) => ({
        url: "contact/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
    updateContact: build.mutation({
      query: (data) => ({
        url: "contact/" + data.id.toString(),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactEndPoint;
