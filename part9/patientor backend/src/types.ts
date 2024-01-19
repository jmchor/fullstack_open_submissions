export interface PatientData {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export type NonSensitiveEntries = Omit<PatientData, 'ssn'>;
