import { ICreateTagDTO, ITags } from '@/features/tag/interfaces';
import { customAxios } from '@/core/common/network';
import { logError, mapAxiosErrorToAppError } from '@/core/common/errors';
import { IGeneralResponse } from '@/core/common/interfaces';

const PATH = '/tags';

export const TagService = {
  getAllTags: async (): Promise<ITags[]> => {
    try {
      const response = await customAxios.get(`${PATH}`);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  createTag: async (payload: ICreateTagDTO): Promise<ITags> => {
    try {
      const response = await customAxios.post(`${PATH}`, payload);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  deleteTag: async (id: number): Promise<IGeneralResponse> => {
    try {
      const response = await customAxios.delete(`${PATH}/${id}`);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
};
