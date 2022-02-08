import axios, { AxiosInstance } from 'axios';
import { store } from '../store';
import globalConfig from '../variables/global-config';

const { apiBaseURL } = globalConfig;

function getClient(baseURL: any) {
  const options = {
    baseURL: baseURL || apiBaseURL,
  };
  const client = axios.create(options);

  client.interceptors.request.use(
    async (requestConfig) => {
      const interceptedConfig = { ...requestConfig };
      const { currentUser } = store.getState().auth;
      if (currentUser) {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        const { token } = auth;
        if (token) {
          interceptedConfig.headers = {
            ...interceptedConfig.headers,
            Authorization: `Bearer ${token}`,
          };
        } else {
          console.warn('No Authorization Bearer token was passed in');
        }
      }
      return interceptedConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  return client;
}

class ApiClient {
  client = {} as AxiosInstance;

  constructor(baseURL = apiBaseURL) {
    this.client = getClient(baseURL);
  }

  get(url: string, conf?: any) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        console.log(`Request failed for ${url}`, error);
        throw error;
      });
  }

  delete(url: string, conf?: any) {
    return this.client
      .delete(url, { data: conf })
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        console.log(`Request failed for ${url}`, error);
        throw error;
      });
  }

  post(url: string, data: any, conf?: any) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        console.log(`Request failed for ${url}`, error);
        throw error;
      });
  }

  put(url: string, data: any, conf?: any) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        console.log(`Request failed for ${url}`, error);
        throw error;
      });
  }

  patch(url: string, data: any, conf?: any) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => {
        console.log(`Request failed for ${url}`, error);
        Promise.reject(error);
      });
  }
}

const defaultClient = new ApiClient();

export default defaultClient;

export { ApiClient };
