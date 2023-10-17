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
				<DialogTitle id="alert-dialog-title"><span style={{ fontSize: '50px', fontWeight: '800', textAlign: 'center', color: '#000', textDecoration: 'uppercase' }}>Queue info</span></DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{serverErrorMsg ? (
							serverErrorMsg
						) : (
							<>
							<div style={{ fontWeight: '600', textAlign: 'center', fontSize: '20px', color: '#0a0a0a' }} >
								You queue number will be{' '}
								<span style={{ fontWeight: '800' }}>{queueNumber}</span>, and we will inform you once your queue is ready to be assigned, thanks. If you don't have Data Roaming with WhatsApp and Messenger to receive the Queue notification, please wait in front of the outlet for your turn. We have no way to contact you. We don't make international calls for seating purposes. Thanks for your understanding.
								</div>
								<div style={{ fontWeight: '600', fontSize: '20px',marginTop: '30px', textAlign: 'center', color: "#0a0a0a" }}>
								이 메세지를 꼭 참고하여 주세요. Q 알림을 받을 수 있는 WhatsApp 및 Messager의 데이터 로밍이 없는 경우 매장 앞에서 차례를 기다려주세요. 저희는 국제전화를 걸지 않기 때문에 연락할 방법이 없는 점 양해부탁드릴께요. 이해해주셔서 감사합니다. 오늘도 저희 매장을 찾아주셔서 감사합니다.
							</div>
							</>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	)
}
