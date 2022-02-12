import { Models } from '@rematch/core';
import { auth } from './auth';
import { dashboards } from './dashboards';

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
  dashboards: typeof dashboards;
}

export const models: IRootModel = { auth, dashboards };
