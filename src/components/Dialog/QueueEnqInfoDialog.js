import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect, useState,NewlineText } from 'react'

export default function QueueEnqInfoDialog({ queueEnqMsg, setQueueEnqMsg, EnqErrorMsg, setEnqErrorMsg }) {
	const [open, setOpen] = useState(!!queueEnqMsg || !!EnqErrorMsg)

	const handleClickOpen = () => {
		setOpen(true)
	}
	function NewlineText(props) {
		const text = props.text;
		return text.split('\n').map(str => <p>{str}</p>);
	}
	useEffect(() => {
		console.log(queueEnqMsg)
		const timer = setTimeout(() => {
			handleClose()
			setQueueEnqMsg('')
			setEnqErrorMsg('')
		}, 10000)
		return () => clearTimeout(timer)
	}, [setQueueEnqMsg, setEnqErrorMsg])

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				disableBackdropClick 
				disableEscapeKeyDown
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Queue Summary</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" component="div">
						
						
							{EnqErrorMsg ? (
									<NewlineText text={EnqErrorMsg} />
									
								) : (
									
									<NewlineText text={queueEnqMsg} />
									
							)}
						
					</DialogContentText>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	)
}
