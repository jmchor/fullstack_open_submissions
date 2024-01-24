import { useState } from 'react';
import patientService from '../../services/patients';
import { Diagnosis, EntryWithoutId, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { AxiosError } from 'axios';

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Checkbox,
	FormGroup,
	CardContent,
	Card,
} from '@mui/material';

const EntryForm = ({ diagnoses, patientID }: { diagnoses: Diagnosis[]; patientID: string }) => {
	const today = new Date();
	const formattedToday = today.toISOString().split('T')[0];

	const [description, setDescription] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [date, setDate] = useState<string>(formattedToday);
	const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
	const [entryType, setEntryType] = useState<string>('');
	const [employerName, setEmployerName] = useState<string>('');
	const [sickLeaveStart, setSickLeaveStart] = useState<string>(formattedToday);
	const [sickLeaveEnd, setSickLeaveEnd] = useState<string>(formattedToday);
	const [dischargeDate, setDischargeDate] = useState<string>(formattedToday);
	const [criteria, setCriteria] = useState<string>('');
	const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
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
				} as OccupationalHealthcareEntry;
				console.log('ENTRYDATA', entryData);
				break;

			case 'Hospital':
				entryData = {
					type: 'Hospital',
					description,
					specialist,
					date,
					diagnosisCodes,
					discharge: { date: dischargeDate, criteria },
				} as HospitalEntry;
				console.log('ENTRYDATA', entryData);
				break;

			case 'HealthCheck':
				entryData = {
					type: 'HealthCheck',
					description,
					date,
					specialist,
					healthCheckRating,
				} as HealthCheckEntry;
				console.log('ENTRYDATA', entryData);
				break;

			default:
				break;
		}

		try {
			const addEntry = await patientService.addEntry(entryData as EntryWithoutId, patientID);
			console.log(addEntry);
			setErrorMessage('');
			// Handle success, redirect, or update UI as needed
			void window.location.reload();
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data;
				if (errorMessage) {
					setErrorMessage(errorMessage);
				}
			}
			// Handle error, display error message, etc.
		}
	};

	const errorStyles: React.CSSProperties = {
		color: 'red',
		border: '2px solid red',
		backgroundColor: '#d3d3d3',
		fontSize: '1.2em',
		padding: '15px 10px',
	};

	return (
		<Card>
			<CardContent>
				{errorMessage && <p style={errorStyles}>{errorMessage}</p>}
				<form onSubmit={handleSubmit}>
					<FormControl fullWidth margin='normal'>
						<InputLabel htmlFor='entry-type'>Entry Type</InputLabel>
						<Select label='Entry Type' id='entry-type' value={entryType} onChange={(e) => setEntryType(e.target.value)}>
							<MenuItem value=''>Select Entry Type</MenuItem>
							<MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
							<MenuItem value='Hospital'>Hospital</MenuItem>
							<MenuItem value='HealthCheck'>Health Check</MenuItem>
						</Select>
					</FormControl>
					{(() => {
						switch (entryType) {
							case 'OccupationalHealthcare':
								return (
									<>
										<TextField
											label='Employer Name'
											fullWidth
											margin='normal'
											value={employerName}
											onChange={(e) => setEmployerName(e.target.value)}
										/>
										<TextField
											type='date'
											label='Sick Leave (Start Date)'
											fullWidth
											value={sickLeaveStart}
											onChange={(e) => setSickLeaveStart(e.target.value)}
										/>
										<TextField
											type='date'
											label='Sick Leave (End Date)'
											fullWidth
											margin='normal'
											value={sickLeaveEnd}
											onChange={(e) => setSickLeaveEnd(e.target.value)}
										/>
									</>
								);
							case 'Hospital':
								return (
									<>
										<TextField
											type='date'
											label='Discharge Date'
											fullWidth
											margin='normal'
											value={dischargeDate}
											onChange={(e) => setDischargeDate(e.target.value)}
										/>
										<TextField
											label='Criteria'
											fullWidth
											margin='normal'
											value={criteria}
											onChange={(e) => setCriteria(e.target.value)}
										/>
									</>
								);
							case 'HealthCheck':
								return (
									<>
										<FormControl component='fieldset' fullWidth margin='normal'>
											<FormLabel component='legend'>Health Check Rating</FormLabel>
											<RadioGroup
												aria-label='healthCheckRating'
												name='healthCheckRating'
												value={healthCheckRating.toString()}
												onChange={(e) => setHealthCheckRating(Number(e.target.value))}
											>
												{[1, 2, 3, 4].map((rating) => (
													<FormControlLabel
														key={rating}
														value={rating.toString()}
														control={<Radio />}
														label={rating.toString()}
													/>
												))}
											</RadioGroup>
										</FormControl>
									</>
								);
							default:
								return null;
						}
					})()}
					<TextField
						label='Description'
						fullWidth
						margin='normal'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<TextField
						label='Specialist'
						fullWidth
						margin='normal'
						value={specialist}
						onChange={(e) => setSpecialist(e.target.value)}
					/>
					<TextField
						type='date'
						label='Date'
						fullWidth
						margin='normal'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					{entryType !== 'HealthCheck' && (
						<div>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>Diagnosis Codes (Select multiple)</FormLabel>
								<FormGroup>
									{diagnoses.map((item) => (
										<FormControlLabel
											key={item.code}
											control={
												<Checkbox
													checked={diagnosisCodes.includes(item.code)}
													onChange={() => {
														const updatedCodes = diagnosisCodes.includes(item.code)
															? diagnosisCodes.filter((code) => code !== item.code)
															: [...diagnosisCodes, item.code];
														setDiagnosisCodes(updatedCodes);
													}}
												/>
											}
											label={item.name}
										/>
									))}
								</FormGroup>
							</FormControl>
						</div>
					)}
					<Button type='submit' variant='contained' color='primary'>
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default EntryForm;
