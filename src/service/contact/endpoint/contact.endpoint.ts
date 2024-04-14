import { contactApi } from "./../service";

const contactEndPoint = contactApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: () => ({
        url: "contact",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetContactsQuery } = contactEndPoint;
