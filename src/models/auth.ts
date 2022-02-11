import { createModel } from '@rematch/core';
import { RootModel } from '.';
import apiClient from '../services/api-client';
import { TLoginPayload, TSignUpPayload } from '../interfaces/auth-interfaces';
interface IAuthState {
  currentUser: any;
}

export const auth = createModel<RootModel>()({
  state: {
    currentUser: null,
  } as IAuthState,
  reducers: {
    setCurrentUser: (state, payload) => ({ ...state, currentUser: payload }),
  },
  effects: (dispatch) => ({
    async doLogin(payload: TLoginPayload, state) {
      try {
        const endpoint = `auth/login`;
        const result = await apiClient.post(endpoint, payload);
        if (result.data) {
          const auth = {
            ...result.data,
            currentUser: { ...payload },
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
        if (result.data) {
          return this.doLogin(payload);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async doSignOut(payload, state) {
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
