import { createMMKV } from 'react-native-mmkv';
import { IAuthCurrentUserResponse, IAuthLoginResponse } from '@/features/authentication/interfaces';

const storage = createMMKV();

type TokenStore = {
  setToken: (value: Omit<IAuthLoginResponse, 'user'>) => void;
  getToken: () => Omit<IAuthLoginResponse, 'user'> | null;
  removeToken: () => void;
  setUser: (value: IAuthCurrentUserResponse) => void;
  getUser: () => IAuthCurrentUserResponse | null;
  removeUser: () => void;
};

const zustandStorage: TokenStore = {
  setToken: (value: Omit<IAuthLoginResponse, 'user'>) => {
    storage.set('token', JSON.stringify(value));
  },
  getToken: (): Omit<IAuthLoginResponse, 'user'> | null => {
    const value = storage.getString('token');
    return value ? (JSON.parse(value) as IAuthLoginResponse) : null;
  },
  removeToken: () => {
    storage.remove('token');
  },
  setUser: (value: IAuthCurrentUserResponse) => {
    storage.set('user', JSON.stringify(value));
  },
  getUser: (): IAuthCurrentUserResponse | null => {
    const value = storage.getString('user');
    return value ? (JSON.parse(value) as IAuthCurrentUserResponse) : null;
  },
  removeUser: () => {
    storage.remove('user');
  },
};

export default zustandStorage;
