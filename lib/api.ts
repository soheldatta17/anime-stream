import axios from 'axios';

export interface AnimeData {
  mal_id: number;
  title: string;
  synopsis: string;
  episodes: number;
  score: number;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}

export interface ApiResponse {
  data: AnimeData[];
}

const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

let requestQueue: Promise<any>[] = [];
const RATE_LIMIT_DELAY = 1000; // 1 second delay between requests

const enqueueRequest = async <T>(request: () => Promise<T>): Promise<T> => {
  const promise = (async () => {
    if (requestQueue.length > 0) {
      await Promise.all(requestQueue);
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
    }
    return request();
  })();

  requestQueue.push(promise);
  const result = await promise;
  requestQueue = requestQueue.filter(p => p !== promise);
  return result;
};

export const getTopAnime = async (): Promise<ApiResponse> => {
  return enqueueRequest(async () => {
    const response = await api.get('/top/anime', {
      params: {
        limit: 20,
      },
    });
    return response.data;
  });
};

export const getSeasonalAnime = async (): Promise<ApiResponse> => {
  return enqueueRequest(async () => {
    const response = await api.get('/seasons/now', {
      params: {
        limit: 16,
      },
    });
    return response.data;
  });
};

export const searchAnime = async (query: string): Promise<ApiResponse> => {
  return enqueueRequest(async () => {
    const response = await api.get('/anime', {
      params: {
        q: query,
        limit: 20,
      },
    });
    return response.data;
  });
};