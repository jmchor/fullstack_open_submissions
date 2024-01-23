export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Female = 'female',
	Male = 'male',
	Other = 'other',
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export type SickLeave = {
	startDate: string;
	endDate: string;
};
export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: SickLeave;
}

export type Discharge = {
	date: string;
	criteria: string;
};

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export enum EntryTypes {
	Hospital = 'Hospital',
	OccupationalHealthcare = 'OccupationalHealthcare',
	HealthCheck = 'HealthCheck',
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitiveEntries = Omit<Patient, 'ssn'>;
export type NewPatientInfo = Omit<Patient, 'id'>;

// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>; // Define special omit for unions
