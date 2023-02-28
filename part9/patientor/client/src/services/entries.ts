import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, EntryWithoutId } from '../types';

const create = async (object: EntryWithoutId, patientId: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

export const entryService = {
  create,
};
