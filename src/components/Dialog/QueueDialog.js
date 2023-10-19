import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { HOST, getOutletFullname, outletAbbr } from '../../utils/config'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './QueueDialog.css'

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
		justifyContent: 'center',
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
	PhoneInput: {
		minWidth: '100vw',
		border: '5px solid pink',
	},
}))

export default function QueueDialog({ setQueueNumber, serverErrorMsg, setServerErrorMsg, queueMaxPax }) {
	const [buttonHidden, setButtonHidden] = useState(false)
	const [outletFullname, setOutletFullname] = useState(getOutletFullname(outletAbbr))
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
	const [valid, setValid] = useState(true)
	const [phoneErrorMsg, setPhoneErrorMsg] = useState('')
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [phoneNo, setPhoneNo] = useState('')

	const handleChange = (value) => {
		const id = event.target.id
		if (id == 'phoneNo') {
			setPhoneNo(id);
			setValid(validatePhoneNumber(id));
		}
		if (id === 'validator') {
			setjoinMember(event.target.checked)
		}
		else {
			setNewQueue({ ...newQueue, [id]: event.target.value })
		}
		console.log('HandleChange event:', event)
		console.log('New Queue:', newQueue)
	}

	const validatePhoneNumber = phoneNo => {
		const phoneNumberPattern = /^\d{10}$/;
		return phoneNumberPattern.test(phoneNo);
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)

		setNewQueue({
			name: '',
			phoneNo: '+65',
			paxNo: '',
			birthDate: '',
			gender: 'male',
			member: false,
			email: '',
			outlet: outletFullname,
		})
	}

	const handleSubmit = (e, newQueue) => {
		e.preventDefault()
		if (!valid) {
			setPhoneErrorMsg(phoneErrorMsg)
			return
		}
		const updatedQueue = {
			...newQueue,
			phoneNo: phoneNo,
			member: joinMember,
		}
		console.log(updatedQueue)
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
				return data
			} catch (error) {
				console.log(error)
			}
		}
		postData(updatedQueue).then(data => {
			if (data.statusCode === 400) {
				setButtonHidden(false)
				setServerErrorMsg(data.message)
				handleClose()
			} else {
				setButtonHidden(false)
				setQueueNumber(data.queueNo)
				handleClose()
			}
		})
	}

	return (
		<form autoComplete="off" onSubmit={e => handleSubmit(e, newQueue)} className={classes.root}>
			<TextField
				margin="normal"
				fullWidth
				variant="outlined"
				id="name"
				label="Name"
				value={newQueue.name}
				onChange={handleChange}
				type="text"
				required
				autoFocus={true}
			/>
			<label>Phone Input</label>
			<PhoneInput
				margin="normal"
				fullWidth
				variant="outlined"
				id="phoneNo"
				label="Phone Number"
				type="tel"
				country="sg"
				value={newQueue.phoneNo}
				onChange={handleChange}
				autoFocus={true}
				inputProps={{
					required: true,
				}}
			/>
			{!valid && <p>Please enter a valid 10 digit number</p>}
			<TextField
				margin="normal"
				fullWidth
				variant="outlined"
				id="paxNo"
				label="Party Size"
				type="number"
				value={newQueue.paxNo}
				onChange={handleChange}
				required
				InputProps={{ inputProps: { min: 1, max: 10 } }}
			/>

			<div className={classes.buttonWrapper}>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button type="submit" color="primary" disabled={buttonHidden}>
					Add
				</Button>
			</div>
		</form>
	)
}
