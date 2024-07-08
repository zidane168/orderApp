export interface ISession {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
    expires: string;
    [key: string]: any;
  }