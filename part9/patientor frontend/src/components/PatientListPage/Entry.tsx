import { Diagnosis, Entry, assertNever } from '../../types';

const EntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
	switch (entry.type) {
		case 'Hospital':
			return (
				<div>
					<p>
						<b>Date: {entry.date}</b>
						<br />
						<br />
						Description: <i>{entry.description}</i>
					</p>
					<ul>
						{entry?.diagnosisCodes &&
							entry.diagnosisCodes.map((code) => {
								const matchingDiagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
								return <li key={code}>{matchingDiagnosis ? `${code}: ${matchingDiagnosis.name}` : code}</li>;
							})}
					</ul>

					{entry.discharge && (
						<div>
							<p>Discharged on {entry.discharge.date}</p>
							<p>Notes: {entry.discharge.criteria}</p>
						</div>
					)}
					<p>
						Diagnosis by <b>{entry.specialist}</b>
					</p>
				</div>
			);
			break;
		case 'OccupationalHealthcare':
			return (
				<div>
					<p>
						{entry.date} <i>{entry.description}</i>
					</p>
					<p>Employer: {entry.employerName}</p>
					<ul>
						{entry?.diagnosisCodes &&
							entry.diagnosisCodes.map((code) => {
								const matchingDiagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
								return <li key={code}>{matchingDiagnosis ? `${code}: ${matchingDiagnosis.name}` : code}</li>;
							})}
					</ul>

					{entry.sickLeave && (
						<p>
							Sick leave from {entry?.sickLeave?.startDate} to {entry?.sickLeave?.endDate}
						</p>
					)}

					<p>
						Diagnosis by <b>{entry.specialist}</b>
					</p>
				</div>
			);
			break;
		case 'HealthCheck':
			return (
				<div>
					<p>
						{entry.date} <i>{entry.description}</i>
					</p>
					<ul>
						{entry?.diagnosisCodes &&
							entry.diagnosisCodes.map((code) => {
								const matchingDiagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
								return <li key={code}>{matchingDiagnosis ? `${code}: ${matchingDiagnosis.name}` : code}</li>;
							})}
					</ul>
					<p>Healthcheck Rating: {entry.healthCheckRating}</p>
					<p>
						Diagnosis by <b>{entry.specialist}</b>
					</p>
				</div>
			);
			break;
		default:
			return assertNever(entry);
	}
};
export default EntryDetails;
