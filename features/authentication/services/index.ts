import axios from 'axios';
import {
  IAuthLoginRequest,
  IAuthLoginResponse,
  IAuthSignUpRequest,
} from '@/features/authentication/interfaces';
import { logError, mapAxiosErrorToAppError } from '@/core/common/errors';
import { customAxios } from '@/core/common/network';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const PATH = '/auth';

export const AuthenticationService = {
  loginApple: async (): Promise<IAuthSignUpRequest> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      return {
        email: credential.email as string,
        name: `${credential.fullName?.givenName ?? ''} ${credential.fullName?.familyName ?? ''}`.trim(),
      };
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  loginGoogle: async (): Promise<IAuthSignUpRequest> => {
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      return {
        email: response.data?.user?.email as string,
        name: `${response.data?.user?.givenName as string} ${response.data?.user?.familyName as string}`.trim(),
      };
    } catch (error) {
      const createErrorObj = (message: string) => ({
        status: 400,
        error: {
          code: 400,
          message,
        },
      });
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            const errorObj1 = createErrorObj('Sign-in is already in progress');
            const err1 = mapAxiosErrorToAppError(errorObj1);
            logError(err1);
            throw err1;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            const errorObj2 = createErrorObj('Google Play Services not available or outdated');
            const err2 = mapAxiosErrorToAppError(errorObj2);
            logError(err2);
            throw err2;
          case statusCodes.SIGN_IN_CANCELLED:
            const errorObj3 = createErrorObj('Sign-in was cancelled by the user');
            const err3 = mapAxiosErrorToAppError(errorObj3);
            logError(err3);
            throw err3;
          default:
          // some other error happened
        }
      } else {
        const appErr = mapAxiosErrorToAppError(error);
        logError(appErr);
        throw appErr;
      }

      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
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
