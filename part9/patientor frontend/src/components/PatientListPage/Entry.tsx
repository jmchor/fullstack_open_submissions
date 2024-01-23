import { Entry, assertNever } from '../../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case 'Hospital':
			return (
				<div>
					<p>
						{entry.date} <i>{entry.description}</i>
					</p>
					<ul>{entry?.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>
					{entry.discharge && (
						<div>
							<p>Discharged on {entry.discharge.date}</p>
							<p>{entry.discharge.criteria}</p>
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
					<ul>{entry?.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>
					<p>
						Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
					</p>
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
					<ul>{entry?.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>
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
