import { HealthCheckRating, Discharge, SickLeave, Diagnosis, EntryWithoutId } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const isNumber = (text: unknown): text is number => {
	return typeof text === 'number' || text instanceof Number;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Missing info in specialist field');
	}
	return specialist;
};
const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Missing info in description field');
	}
	return description;
};

const parseCriteria = (dischargeCriteria: unknown): string => {
	if (!dischargeCriteria || !isString(dischargeCriteria)) {
		throw new Error('Missing info in criteria field');
	}
	return dischargeCriteria;
};
const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
		throw new Error('Incorrect or missing data');
	}
	const newDischarge: Discharge = {
		date: parseDate(discharge.date),
		criteria: parseCriteria(discharge.criteria),
	};
	return newDischarge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
		throw new Error('Incorrect or missing data');
	}
	const newSickLeave: SickLeave = {
		startDate: parseDate(sickLeave.startDate),
		endDate: parseDate(sickLeave.endDate),
	};
	return newSickLeave;
};

const isHealthCheck = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => v as number)
		.includes(param);
};
const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
	if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheck(healthCheckRating)) {
		throw new Error(`Incorrect Health Rating: ${healthCheckRating}, should be in the range 1 - 4`);
	}
	return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewDiagnosticEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object' || !('type' in object)) {
		throw new Error('Incorrect or missing data');
	}

	if (!('description' in object && 'date' in object && 'specialist' in object)) {
		throw new Error('Incorrect or missing data');
	}

	switch (object.type) {
		case 'Hospital':
			if ('discharge' in object) {
				const newEntry: EntryWithoutId = {
					type: object.type,
					description: parseDescription(object.description),
					date: parseDate(object.date),
					specialist: parseSpecialist(object.specialist),
					discharge: parseDischarge(object.discharge),
					diagnosisCodes: parseDiagnosisCodes(object),
				};
				console.log(newEntry);
				return newEntry;
			} else {
				throw new Error('Incorrect or missing data');
			}
		case 'OccupationalHealthcare':
			if ('sickLeave' in object && 'employerName' in object) {
				const newEntry: EntryWithoutId = {
					type: object.type,
					description: parseDescription(object.description),
					date: parseDate(object.date),
					specialist: parseSpecialist(object.specialist),
					sickLeave: parseSickLeave(object.sickLeave),
					employerName: parseName(object.employerName),
					diagnosisCodes: parseDiagnosisCodes(object),
				};
				console.log(newEntry);

				return newEntry;
			} else {
				throw new Error('Incorrect or missing data');
			}
		case 'HealthCheck':
			if ('healthCheckRating' in object) {
				const newEntry: EntryWithoutId = {
					type: object.type,
					description: parseDescription(object.description),
					date: parseDate(object.date),
					specialist: parseSpecialist(object.specialist),
					healthCheckRating: parseHealthCheck(object.healthCheckRating),
					diagnosisCodes: parseDiagnosisCodes(object),
				};
				console.log(newEntry);

				return newEntry;
			} else {
				throw new Error('Incorrect or missing data');
			}
		default:
			throw new Error('Invalid entry type');
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiagnosticEntry;
