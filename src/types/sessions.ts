export interface ISession {
    user?: {
      name?: string;
      email?: string;
      avatar?: string;
      token: string;
      phone?: string;
    };
    expires: string;
    [key: string]: any;
  }