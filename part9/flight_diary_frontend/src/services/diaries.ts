import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const apiBaseUrl = 'http://localhost:3004/api/diaries';

const getAll = async () => {
	const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}`);

	return data;
};

const create = async (object: NewDiaryEntry) => {
	const { data } = await axios.post<NewDiaryEntry>(`${apiBaseUrl}`, object);

	return data;
};

export default {
	getAll,
	create,
};
