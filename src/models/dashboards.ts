import { createModel } from '@rematch/core';
import { v4 as uuidv4 } from 'uuid';
import { IRootModel } from '.';
import { IDashboard } from '../interfaces/common-interfaces';
import apiClient from '../services/api-client';

type TDashboardState = Array<IDashboard>;

export const dashboards = createModel<IRootModel>()({
  state: [] as TDashboardState,
  reducers: {
    setDashboards: (state, payload) => payload,
    createOrUpdateDashboard: (state, payload: IDashboard) =>
      state.map((d) => (d.id === payload.id ? payload : d)),
  },
  effects: (dispatch) => ({
    async doFetchDashboards() {
      try {
        const endpoint = `dashboards`;
        const result = await apiClient.get(endpoint);
        if (result.data) {
          dispatch.dashboards.setDashboards(result.data);
        }
        return result.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async doCreateOrUpdateDashboard(payload, state) {
      try {
        const id = payload.id ? payload.id : uuidv4();
        const endpoint = `dashboards/${id}`;
        const result = await apiClient.put(endpoint, { ...payload, id });
        if (result.data) {
          await dispatch.dashboards.doFetchDashboards();
        }
        return result.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async doUpdateWidgets(payload, state) {
      try {
        const endpoint = `dashboards/${payload.id}`;
        const result = await apiClient.put(endpoint, payload);
        return result.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  }),
});
