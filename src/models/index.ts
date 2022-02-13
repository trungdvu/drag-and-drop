import { Models } from '@rematch/core';
import { auth } from './auth';
import { dashboards } from './dashboards';
import { viewEdit } from './view-edit';

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
  dashboards: typeof dashboards;
  viewEdit: typeof viewEdit;
}

export const models: IRootModel = { auth, dashboards, viewEdit };
