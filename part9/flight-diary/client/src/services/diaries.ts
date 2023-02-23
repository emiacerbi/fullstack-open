import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (newDiaryEntry: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, newDiaryEntry);
  return response.data;
};

export default {
  getAll,
  create,
};
