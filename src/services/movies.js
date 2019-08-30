import request from '../utils/request';
import {
  setOnStorage,
  getFromStorage,
} from '../utils/localStorage'; 

const URL = 'https://api.themoviedb.org/3';
const API_KEY_LABEL = 'api_key=69688a4a8e7f1a8912e2989cc7be5d27';

export async function getConfiguration() {
  return new Promise(function(resolve, reject) {
    const config = getFromStorage('moviesConfig');
    if (!config) {
      return request(`${URL}/configuration?${API_KEY_LABEL}`, {
        method: 'GET',
      })
      .then(responseData => {
        const configImg = responseData.images;
        setOnStorage('moviesConfig', configImg);
        resolve(configImg);
      })
      .catch(err => reject(err));
    }
    resolve(config);
  });
};

export async function getDiscoverMovies() {
  return request(`${URL}/discover/movie?sort_by=popularity.desc&${API_KEY_LABEL}`, {
    method: 'GET',
  });
}

export async function search(titleToSearch) {
  return request(`${URL}/search/movie?${API_KEY_LABEL}&query=${titleToSearch}`, {
    method: 'GET',
  });
}