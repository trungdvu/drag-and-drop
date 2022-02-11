import { Models } from '@rematch/core';
import { auth } from './auth';

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
}

export const models: IRootModel = { auth };
