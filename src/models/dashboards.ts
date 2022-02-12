import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import apiClient from '../services/api-client';

type TDashboard = {
  id: string;
  userId: string;
  title?: string;
  layoutType?: string;
  widgets?: [
    {
      title: string;
      widgetType: string;
      minWidth: number;
      minHeight: number;
      configs: any;
    }
  ];
};

type TDashboardState = Array<TDashboard>;

export const dashboards = createModel<IRootModel>()({
  state: [] as TDashboardState,
  reducers: {
    setDashboards: (state, payload) => payload,
    createOrUpdateDashboard: (state, payload: TDashboard) =>
      state.map((d) => {
        if (d.id === payload.id) {
          return payload;
        }
        return d;
      }),
  },
  effects: (dispatch) => ({
    async doFetchDashboards() {
      try {
        const endpoint = `dashboards`;
        const result = await apiClient.get(endpoint);
        if (result.data) {
          dispatch.dashboards.setDashboards(result.data);
        }
        return result;
      } catch (error: any) {
        console.log(error.message);
      }
    },

    async doCreateOrUpdateDashboard(payload: TDashboard, state) {
      return true;
    },
  }),
});
