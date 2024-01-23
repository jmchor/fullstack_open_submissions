import React, { useState } from 'react';
import axios from 'axios';
import { Diagnosis, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';

const EntryForm = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [date, setDate] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [entryType, setEntryType] = useState<string>('');
	const [employerName, setEmployerName] = useState<string>('');
	const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
	const [dischargeDate, setDischargeDate] = useState<string>('');
	const [criteria, setCriteria] = useState<string>('');
	const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

	const handleSubmit = async () => {
		let entryData: EntryWithoutId | undefined = undefined;

		switch (entryType) {
			case 'OccupationalHealthcare':
				entryData = {
					type: 'OccupationalHealthcare',
					description,
					specialist,
					date,
					diagnosisCodes,
					employerName,
					sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
				};
				break;

			case 'Hospital':
				entryData = {
					type: 'Hospital',
					description,
					specialist,
					date,
					diagnosisCodes,
					discharge: { date: dischargeDate, criteria },
				};
				break;

			case 'HealthCheck':
				entryData = {
					type: 'HealthCheck',
					description,
					date,
					specialist,
					healthCheckRating,
				};
				break;

			default:
				break;
		}

		try {
			const response = await axios.post('your_api_endpoint_here', entryData);
			console.log('Form submitted successfully!', response.data);
			// Handle success, redirect, or update UI as needed
		} catch (error) {
			console.error('Error submitting form:', error);
			// Handle error, display error message, etc.
		}
	};

	return (
		<div>
			<label>Entry Type:</label>
			<select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
				<option value=''>Select Entry Type</option>
				<option value='OccupationalHealthcare'>Occupational Healthcare</option>
				<option value='Hospital'>Hospital</option>
				<option value='HealthCheck'>Health Check</option>
			</select>

			{(() => {
				switch (entryType) {
					case 'OccupationalHealthcare':
						return (
							<>
								<label>Employer Name:</label>
								<input type='text' value={employerName} onChange={(e) => setEmployerName(e.target.value)} />

								<label>Sick Leave (Start Date):</label>
								<input type='date' value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)} />

								<label>Sick Leave (End Date):</label>
								<input type='date' value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)} />
							</>
						);

					case 'Hospital':
						return (
							<>
								<label>Discharge Date:</label>
								<input type='date' value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} />

								<label>Criteria:</label>
								<input type='text' value={criteria} onChange={(e) => setCriteria(e.target.value)} />
							</>
						);

					case 'HealthCheck':
						return (
							<>
								<label>Health Check Rating:</label>
								<div>
									{[1, 2, 3, 4].map((rating) => (
										<label key={rating}>
											<input
												type='radio'
												value={rating}
												checked={healthCheckRating === rating}
												onChange={() => setHealthCheckRating(rating)}
											/>
											{rating}
										</label>
									))}
								</div>
							</>
						);

					default:
						return null;
				}
			})()}
			<label>Description:</label>
			<input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

			<label>Specialist:</label>
			<input type='text' value={specialist} onChange={(e) => setSpecialist(e.target.value)} />

			<label>Date:</label>
			<input type='date' value={date} onChange={(e) => setDate(e.target.value)} />

			<label>Diagnosis Codes (Select multiple):</label>
			{diagnoses.map((item) => (
				<div key={item.code}>
					<input
						type='checkbox'
						id={item.code}
						value={item.code}
						checked={diagnosisCodes.includes(item.code)}
						onChange={() => {
							const updatedCodes = diagnosisCodes.includes(item.code)
								? diagnosisCodes.filter((code) => code !== item.code)
								: [...diagnosisCodes, item.code];
							setDiagnosisCodes(updatedCodes);
						}}
					/>
					<label htmlFor={item.code}>{item.name}</label>
				</div>
			))}

			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};

export default EntryForm;
