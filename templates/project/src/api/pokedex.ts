import Axios, { AxiosPromise } from 'axios';
import { APIRoot } from './index';

const API = {
  getPokedex: (id: number): AxiosPromise<any> => {
    return Axios.get(`${APIRoot}/pokedex/${id}`);
  },
};

export default API;
