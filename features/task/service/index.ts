import {
  ICreateTaskDTO,
  ITask,
  ITaskQueryParams,
  IUpdateTaskDTO,
} from '@/features/task/interfaces';
import { customAxios } from '@/core/common/network';
import { IGeneralResponse, IPaginationMeta } from '@/core/common/interfaces';
import { logError, mapAxiosErrorToAppError } from '@/core/common/errors';

const PATH = '/tasks';

export const TaskService = {
  getAllTasks: async (query: ITaskQueryParams): Promise<IPaginationMeta<ITask>> => {
    try {
      const response = await customAxios.get(`${PATH}`, {
        params: query,
      });
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  getTaskById: async (id: number): Promise<ITask> => {
    try {
      const response = await customAxios.get(`${PATH}/${id}`);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  createTask: async (task: ICreateTaskDTO): Promise<ITask> => {
    try {
      const response = await customAxios.post(`${PATH}`, task);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  updateTask: async (task: IUpdateTaskDTO, tag_id: number): Promise<ITask> => {
    try {
      const response = await customAxios.put(`${PATH}/${tag_id}`, task);
      return response.data;
    } catch (error) {
      const appErr = mapAxiosErrorToAppError(error);
      logError(appErr);
      throw appErr;
    }
  },
  deleteTask: async (id: number): Promise<IGeneralResponse> => {
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
