import { ErrorAction } from 'constants/actions';
import { apiInstance } from './api-instance';

export const getError = () =>
  apiInstance
    .tracked({
      action: ErrorAction.THROW_ERROR,
      cancelPrevious: true,
    })
    .get<{}>('/error')
    .then((res) => res?.data);
