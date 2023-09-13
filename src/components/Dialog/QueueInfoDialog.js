import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useEffect, useState } from 'react'

export default function QueueInfoDialog({ queueNumber, setQueueNumber, serverErrorMsg, setServerErrorMsg }) {
	const [open, setOpen] = useState(!!queueNumber || !!serverErrorMsg)

	const handleClickOpen = () => {
		setOpen(true)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			handleClose()
			setQueueNumber('')
			setServerErrorMsg('')
		}, 10000)
		return () => clearTimeout(timer)
	}, [setQueueNumber, setServerErrorMsg])

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
				<DialogTitle id="alert-dialog-title">Queue info</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{serverErrorMsg ? (
							serverErrorMsg
						) : (
							<>
								You queue number will be{' '}
								<span style={{ fontSize: '2rem', fontWeight: '800' }}>{queueNumber}</span>, and we you
								inform you once you queue is ready to be assign, thanks.
							</>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	)
}
