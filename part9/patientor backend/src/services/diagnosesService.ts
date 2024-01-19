import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnosisDataArray: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
	return diagnosisDataArray;
};

export default {
	getDiagnoses,
};
