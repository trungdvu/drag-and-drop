import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, IRootModel } from './models';

export const store = init({
  models,
});

export type TStore = typeof store;
export type TDispatch = RematchDispatch<IRootModel>;
export type TRootState = RematchRootState<IRootModel>;
