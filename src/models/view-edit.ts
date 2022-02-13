import { createModel } from '@rematch/core';
import { IRootModel } from '.';

type TMode = 'VIEW' | 'EDIT';

type TViewEditStateType = {
  mode: TMode;
};

export const viewEdit = createModel<IRootModel>()({
  state: {
    mode: 'VIEW',
  } as TViewEditStateType,
  reducers: {
    setMode: (state, payload: TMode) => ({ ...state, mode: payload }),
    toggleMode: (state) => ({
      ...state,
      mode: state.mode === 'VIEW' ? 'EDIT' : 'VIEW',
    }),
  },
});
