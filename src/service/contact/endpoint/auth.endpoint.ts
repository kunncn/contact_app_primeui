import { contactApi } from "./../service";

const authEndPoint = contactApi.injectEndpoints({
  endpoints: (build) => ({
    contactRegister: build.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    contactLogIn: build.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useContactRegisterMutation, useContactLogInMutation } =
  authEndPoint;
