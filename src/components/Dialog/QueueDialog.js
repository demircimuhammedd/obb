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
	const [phoneTouched, setPhoneTouched] = useState(false);
	const [phoneErrorMsg, setPhoneErrorMsg] = useState('')
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [phoneNo, setPhoneNo] = useState('')

	const handleChange = (value, id) => {	  
		if (id === 'phoneNo') {
		  const phoneNo = value.replace(/\D/g, '');
		  setPhoneNo(phoneNo);
		  setValid(validatePhoneNumber(phoneNo));
		} else {
		  setNewQueue({ ...newQueue, [id]: value });
		}
	  }

	const validatePhoneNumber = phoneNo => {
		const phoneNumberPattern = /^(?:\+\d{1,3}[-.\s]?)?\d{10,}$/;
		// let valid = phoneNo.phoneNumberPattern
		return phoneNumberPattern.test(phoneNo);
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)

		setNewQueue({
			name: '',
			phoneNo: ' ',
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
		
		if (phoneTouched && !valid) {
			setPhoneErrorMsg("Please enter a valid phone number.");
			return;
		
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
				onChange={(e) => handleChange(e.target.value, 'name')}
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
				international
				value={newQueue.phoneNo}
				onChange={(value) => handleChange(value, 'phoneNo')}
				autoFocus={true}
				onBlur={() => setPhoneTouched(true)}
				helperText={phoneErrorMsg}
				required
			/>
			{!valid && <p>Please enter a valid phone number</p>}
			<TextField
				margin="normal"
				fullWidth
				variant="outlined"
				id="paxNo"
				label="Party Size"
				type="number"
				value={newQueue.paxNo}
				onChange={(e) => handleChange(e.target.value, 'paxNo')}
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
