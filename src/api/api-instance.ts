import { createInstance } from 'axios-tracked';

// create instance
export const apiInstance = createInstance({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 30000,
});
