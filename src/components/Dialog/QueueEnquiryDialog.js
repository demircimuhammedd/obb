import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { HOST } from '../../utils/config.js'

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			width: '100%',
		},
		'& .MuiFormHelperText-root': {
			color: '#db0011',
			fontSize: '1rem',
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
	phoneInput: {
		'& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
		validInput: {
			borderColor: 'green',
		},
		invalidInput: {
			borderColor: 'red',
		},
	},
}))

export default function QueueEnquiryDialog({ setQueueEnqMsg, EnqErrorMsg, setEnqErrorMsg }) {
	const [open, setOpen] = useState(false)
	const [phoneErrorMsg, setPhoneErrorMsg] = useState('')
	const [EnqNumber, setEnqNumber] = useState({
		// queueId: ''
		phoneNo: '65',
	})
	const classes = useStyles()

	const handleClickOpen = () => {
		setOpen(true)
		setPhoneErrorMsg('')
	}

	const handleClose = () => {
		setOpen(false)

		setEnqNumber({
			phoneNo: '+65',
		})
	}

	const handleChange = (value) => {
		setEnqNumber((prevEnqNumber) => ({ ...prevEnqNumber, phoneNo: value }));
	}

	const handleSubmit = (e, EnqNumber) => {
		e.preventDefault()
		if (!EnqNumber.phoneNo) {
			setPhoneErrorMsg('Please enter a phone number before checking.');
		return;
		}
		if (EnqNumber.phoneNo.length < 10) {
			setPhoneErrorMsg('Please enter a valid 10-digit phone number');
			return;
		} else {
		const postData = async EnqNumber => {
			try {
				const result = await fetch(`${HOST}/queue/paxsummary/${EnqNumber.phoneNo}`, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
				const data = await result.json()
				console.log(data)
				return data
			} catch (error) {
				console.log(error)
			}
		}
		postData(EnqNumber).then(data => {
			// if (data.statusCode === 400) {
			// 	setServerErrorMsg(data.message)
			// 	handleClose()
			console.log(data)
			if (data) {
				if (data.statusCode === 500 || data.statusCode === 400) {
					setEnqErrorMsg('No matching phone number found.' + '\n' + data.message)
				} else {
					if (data.summaryText === '') {
						setQueueEnqMsg('You are the next in queue.')
					} else {
						setQueueEnqMsg(data.summaryText)
					}
				}

				handleClose()
			}
		})
	}
}

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
				style={{ fontSize: '2rem', padding: '20px 30px' }}
			>
				Check Queue
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">My Queue</DialogTitle>
				<DialogContent>
					<form autoComplete="off" onSubmit={e => handleSubmit(e, EnqNumber)} className={classes.root}>
						<div>
							{/* <TextField
								margin="normal"
								fullWidth
								variant="outlined"
								id="queueId"
								label="Queue Number"
								value={EnqNumber.queueId}
								type="number"
								onChange={handleChange}
								required
							/> */}
						<PhoneInput
							margin="normal"
							fullWidth
							variant="outlined"
							id="phoneNo"
							label="Phone Number"
							type="tel"
							value={EnqNumber.phoneNo}
							helperText={phoneErrorMsg}
							onChange={handleChange}
							required
							autoFocus={true}
							FormHelperTextProps={{
								className: classes.phoneInput,
							}}
						/>

						</div>
						<div className={classes.buttonWrapper}>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button type="submit" color="primary">
								Check
							</Button>
						</div>
					</form>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	)
}