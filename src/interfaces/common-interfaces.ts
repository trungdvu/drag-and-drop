export type TLoginPayload = {
  username: string;
  password: string;
};

export type TSignUpPayload = {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
};

export interface IWidget {
  title?: string;
  widgetType?: string;
  minWidth?: string;
  minHeight?: string;
  configs?: any;
}

export interface IDashboard {
  id: string;
  userId?: string;
  title?: string;
  layoutType?: string;
  widgets?: Array<IWidget>;
}
