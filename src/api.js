import axios from 'axios';

const API_PREFIX = '/api';

export const getPosts = lastId => axios.get(
  `${API_PREFIX}/posts${lastId ? `?lastId=${lastId}` : ''}`
);

export const addPost = (title, text) => axios.post(
  `${API_PREFIX}/posts`,
  { data: { title, text } }
);

export const editPost = (id, title, text) => axios.patch(
  `${API_PREFIX}/posts`,
  { data: { id, title, text } }
);
