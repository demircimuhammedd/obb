import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import React, { useState } from 'react'
import { HOST, getOutletFullname, outletAbbr } from '../../utils/config'
import clsx from 'clsx'
import classNames from 'classnames'
const MIN_PHONE_NUMBER_LENGTH = 7 // Define the minimum length for the phone number
const MAX_PHONE_NUMBER_LENGTH = 15 // Define the maximum length for the phone number

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			width: '100%',
		},
		'& .MuiFormHelperText-root': {
			color: '#db0011',
			fontSize: '12px',
			borderBottt: 'none',
		},
	},
	formTitle: {
		paddingBottom: 0,
		marginLeft: '16px',
		paddingTop: '24px',
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: '20px',
	},
	switchWrapper: {
		margin: theme.spacing(2),
		width: '30ch',
	},
	btnWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '1rem',
		paddingTop: '12px',
	},
	invalidInputText: {
		border: 'none',
		fontSize: '12px',
	},
	dFlex: {
		display: 'flex',
	},
	divider: {
		margin: '3rem 16px 2rem',
		backgroundColor: 'rgba(0, 0, 0, 0.42)',
	},
	memberIconWrapper: {
		position: 'absolute',
		right: 0,
	},
	memberIcon: {
		cursor: 'pointer',
	},
	validInput: {
		borderBottom: '1px solid #afff67',
		backgroundColor: 'transparent',
	},
	invalidInput: {
		borderBottom: '1px solid #d60413',
		backgroundColor: 'transparent',
	},
}))

export default function QueueDialog({ setQueueNumber, serverErrorMsg, setServerErrorMsg, queueMaxPax }) {
	const [open, setOpen] = useState(false)
	const [buttonHidden, setButtonHidden] = useState(false)
	const [outletFullname, setOutletFullname] = useState(getOutletFullname(outletAbbr))
	const [isPartySizeValid, setIsPartySizeValid] = useState(false) // Start with false
	const [isPhoneNoValid, setIsPhoneNoValid] = useState(false) // Start with false

	const [newQueue, setNewQueue] = useState({
		name: '',
		phoneNo: '',
		paxNo: '',
		birthDate: '',
		gender: 'male',
		member: false,
		email: '',
		outlet: outletFullname,
	})
	const [joinMember, setjoinMember] = useState(false)
	const genders = [
		{
			value: 'male',
			label: 'Male',
		},
		{
			value: 'female',
			label: 'Female',
		},
	]
	// const [gender, setGender] = React.useState('male');
	const [phoneErrorMsg, setPhoneErrorMsg] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const [paxErrorMsg, setPaxErrorMsg] = useState('')
	const classes = useStyles()

	const validatePhoneNumber = phoneNo => {
		let isValid = false
		let formattedNumber = ''
		const errorMsg = 'Invalid phone number'

		const phoneUtil = PhoneNumberUtil.getInstance()

		try {
			// Remove any non-digit characters from the phone number
			const sanitizedNumber = phoneNo.replace(/\D/g, '')

			// Parse the sanitized number
			const parsedNumber = phoneUtil.parse(sanitizedNumber, 'US') // You can change 'US' to the appropriate country code

			// Check if the parsed number is valid
			isValid = phoneUtil.isValidNumber(parsedNumber)

			// Format the valid number with a '+'
			formattedNumber = '+' + phoneUtil.format(parsedNumber, PhoneNumberFormat.E164)
		} catch (e) {
			return { isValid, formattedNumber, errorMsg }
		}

		return { isValid, formattedNumber, errorMsg }
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setNewQueue({
			name: '',
			phoneNo: '',
			paxNo: '',
			birthDate: '',
			gender: 'male',
			member: false,
			email: '',
			outlet: outletFullname,
		})
	}

	const handleChange = event => {
		const id = event.target.id
		let phoneNo = event.target.value.trim()
		if (phoneNo[0] !== '+') phoneNo = '+' + phoneNo
		const { errorMsg } = validatePhoneNumber(phoneNo)
		if (id === 'phoneNo') {
			setPhoneErrorMsg(errorMsg)
			setNewQueue({ ...newQueue, phoneNo: phoneNo })
		}
		// else if(id === 'validator'){
		// 	setNewQueue({ ...newQueue, [id]: event.target.checked })
		// }
		else {
			setNewQueue({ ...newQueue, [id]: event.target.value })
		}
		// setGender(event.target.value);
		// console.log(event.target.value)
		if (id === 'validator') {
			setjoinMember(event.target.checked)
		}
	}

	const handleSubmit = (e, newQueue) => {
		e.preventDefault()
		const { isValid, hasCountryCode, formattedNumber, errorMsg } = validatePhoneNumber(newQueue.phoneNo)

		if (!isValid || !hasCountryCode) {
			setPhoneErrorMsg(errorMsg)
			return
		}

		// Make the HTTP POST request to submit the form data
		const postData = async newQueue => {
			setButtonHidden(true)
			try {
				const result = await fetch(`${HOST}/queue/current`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newQueue),
				})
				const data = await result.json()

				// Check the response status code
				if (data.statusCode === 400) {
					setServerErrorMsg(data.message)
					handleOpen() // You may need to define a handleOpen function to show the error dialog
				} else {
					setQueueNumber(data.queueNo)
					setIsSuccess(true) // Set isSuccess to true for successful submission
					handleClose()
				}
			} catch (error) {
				console.error(error)
				// Handle error cases here, such as network errors
			}
		}

		// Call the postData function to submit the data
		postData({
			...newQueue,
			phoneNo: formattedNumber.replace(/\+/g, ''),
			member: joinMember,
		})
		console.log(newQueue)
	}

	const renderMemberRegister = () => {
		if (joinMember === true) {
			return (
				<div>
					<TextField
						fullWidth
						variant="outlined"
						id="email"
						label="Email Address"
						type="email"
						value={newQueue.email}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>
					<br />
					<br />
					<TextField
						fullWidth
						variant="outlined"
						id="birthDate"
						label="Date of Birth"
						type="date"
						value={newQueue.birthDate}
						// defaultValue="09-09-1999"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>

					<TextField
						margin="normal"
						fullWidth
						variant="outlined"
						id="gender"
						label="Gender"
						select
						SelectProps={{
							native: true,
						}}
						value={newQueue.gender}
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						required
					>
						{genders.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</TextField>
				</div>
			)
		}
	}
	return (
		<form autoComplete="off" onSubmit={e => handleSubmit(e, newQueue)} className={classes.root}>
			<div>
				<TextField
					className={clsx({
						[classes.validInput]: newQueue.name.trim() !== '',
						[classes.invalidInput]: newQueue.name.trim() === '',
					})}
					margin="normal"
					fullWidth
					variant="outlined"
					id="name"
					label="Name"
					value={newQueue.name}
					type="text"
					onChange={handleChange}
					required // Make the field required
					autoFocus={true}
				/>
				<TextField
					className={clsx({
						[classes.validInput]: isPhoneNoValid,
						[classes.invalidInput]: !isPhoneNoValid,
					})}
					margin="normal"
					fullWidth
					variant="outlined"
					id="phoneNo"
					label="Phone Number"
					type="tel"
					value={newQueue.phoneNo}
					onChange={handleChange}
					required
					error={!isPhoneNoValid}
					helperText={!isPhoneNoValid ? phoneErrorMsg : ''}
				/>
				<TextField
					className={clsx({
						[classes.validInput]: isPartySizeValid,
						[classes.invalidInput]: !isPartySizeValid,
					})}
					margin="normal"
					fullWidth
					variant="outlined"
					id="paxNo"
					label="Party Size"
					type="number"
					value={newQueue.paxNo}
					onChange={handleChange}
					required
					InputProps={{
						inputProps: { min: 1, max: 10 },
					}}
					helperText={paxErrorMsg}
				/>
			</div>
			<div className={classes.buttonWrapper}>
				<Button onClick={handleClose} color="primary" id="cancelBtn">
					Cancel
				</Button>
				<Button type="submit" color="primary" disabled={buttonHidden} id="addBtn">
					Add
				</Button>
			</div>
		</form>
	)
}
