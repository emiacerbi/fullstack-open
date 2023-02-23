import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import diaryService from '../services/diaries';
import { DiaryEntry } from '../types';

const useDiaries = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState(null);
  const [diaryEntry, setDiaryEntry] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  });

  useEffect(() => {
    diaryService
      .getAll()
      .then((res) => setDiaries(res))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setDiaryEntry({
      ...diaryEntry,
      [name]: value,
    });
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiary = await diaryService.create(diaryEntry);
      setDiaries(diaries.concat(newDiary));
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.slice(22));
      } else {
        console.error(error);
      }
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    diaries,
    diaryEntry,
    error,
  };
};

export default useDiaries;
