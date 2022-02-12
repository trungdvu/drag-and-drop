import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import apiClient from '../services/api-client';
import { TLoginPayload, TSignUpPayload } from '../interfaces/auth-interfaces';
import jwt_decode from 'jwt-decode';

type TAuthState = {
  currentUser: any;
};

export const auth = createModel<IRootModel>()({
  state: {
    currentUser: null,
  } as TAuthState,
  reducers: {
    setCurrentUser: (state, payload) => ({ ...state, currentUser: payload }),
  },
  effects: (dispatch) => ({
    async doLogin(payload: TLoginPayload, state) {
      try {
        const endpoint = `auth/login`;
        const result = await apiClient.post(endpoint, payload);
        if (result.data) {
          const currentUser = jwt_decode<any>(result.data.token);
          const auth = {
            ...result.data,
            currentUser,
          };
          localStorage.setItem('auth', JSON.stringify(auth));
          dispatch.auth.setCurrentUser(payload);
        }
        return result.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async doSignUp(payload: TSignUpPayload, state) {
      try {
        const endpoint = `auth/register`;
        const result = await apiClient.post(endpoint, payload);
        console.log(result.data);
        if (result.data) {
          // return this.doLogin(payload);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async doSignOut() {
      try {
        // need userId but no api to get user info
        // const endpoint = `auth/logout`;
        dispatch.auth.setCurrentUser(null);
        localStorage.setItem('auth', JSON.stringify(null));
        return true;
      } catch (error: any) {
        console.log(error);
      }
    },
  }),
});
