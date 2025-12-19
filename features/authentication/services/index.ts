import axios from 'axios';
import { IAuthLoginRequest, IAuthLoginResponse } from '@/features/authentication/interfaces';
import { logError, mapAxiosErrorToAppError } from '@/core/common/errors';
import { customAxios } from '@/core/common/network';

const PATH = '/auth';

export const AuthenticationService = {
  login: async (payload: IAuthLoginRequest): Promise<IAuthLoginResponse> => {
    try {
      const response = await axios.post(`${PATH}/login`, payload);
      return response.data;
    } catch (error: unknown) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  refreshToken: async (refreshToken: string): Promise<IAuthLoginResponse> => {
    try {
      const response = await axios.post(`${PATH}/refresh`, {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error: unknown) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  getCurrentUser: async (id: string): Promise<IAuthLoginResponse> => {
    try {
      const response = await customAxios.get(`${PATH}/${id}`);
      return response.data;
    } catch (error: unknown) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
};
