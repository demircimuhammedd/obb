import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
import awsIot from 'aws-iot-device-sdk'
import React, { useEffect, useState } from 'react'
import Logo from '../../../static/images/cloudE8.png'
import ObbaLogo from '../../../static/images/obba-logo.png'
import { awsIotConfig, company, env, HOST, outletAbbr, getOutletFullname} from '../../utils/config.js'
import Card from '../Card/Card.js'
import CardBody from '../Card/CardBody.js'
import QueueDialog from '../Dialog/QueueDialog'
import QueueEnqInfoDialog from '../Dialog/QueueEnqInfoDialog'
import QueueEnquiryDialog from '../Dialog/QueueEnquiryDialog'
import QueueInfoDialog from '../Dialog/QueueInfoDialog'
import GridContainer from '../Grid/GridContainer.js'
import GridItem from '../Grid/GridItem.js'
import qrcodePageStyle from './styles.js'

const device = awsIot.device(awsIotConfig)
device.on('connect', function() {
	console.log('connect')
	device.subscribe(`${env}/${company}/queue/temp/${outletAbbr}`)
})

const QrcodePage = ({ classes }) => {
	const [tempQueueTopic, setTempQueueTopic] = useState('')
	const [cardAnimation, setCardAnimation] = useState('cardHidden')
	const [qrcodeImg, setQrcodeImg] = useState(null)
	const [loading, setLoading] = useState(true)
	const [counter, setCounter] = React.useState(10)
	// const [queueEnqNumber, setQueueEnqNumber] = useState('')
	const [queueEnqMsg, setQueueEnqMsg] = useState('')

	const [queueNumber, setQueueNumber] = useState('')
	const [serverErrorMsg, setServerErrorMsg] = useState('')
	const [EnqErrorMsg, setEnqErrorMsg] = useState('')
	const [outletFullname, setOutletFullname] = useState(getOutletFullname(outletAbbr))
	const [queueSettings, setQueueSettings] = useState(true)

	// Initial State Data Fetching
	useEffect(() => {
		fetch(`${HOST}/queue/settings`)
			.then(responses => responses.json())
			.then(values => {
				setQueueSettings(values)
				fetch(`${HOST}/queue/topics`)
					.then(responses => responses.json())
					.then(values => {
						const { tempQueueList } = values
						setTempQueueTopic(tempQueueList)

						device.on('error', function(error) {
							console.log(error)
						})

						device.on('message', function(topic, payload) {
							const queueItem = JSON.parse(payload.toString())
							const action = queueItem.action
							console.log(`subscribe ${topic} items`, queueItem)
							console.log(`${topic}`)
							switch (topic) {
								case `${env}/${company}/queue/temp/${outletAbbr}`:
									switch (action) {
										case 'Remove':
											setQrcodeImg(null)
											setLoading(true)
											fetch(`${HOST}/queue/generate`)
												.then(responses => responses.json())
												.then(values => {
													setQrcodeImg(values.dataUrl)
													setLoading(false)
													setCounter(9)
												})
												.catch(error => {
													setLoading(true)
													console.log(error)
												})
											break
										default:
											break
									}
									break

								default:
									break
							}
						})
					})
					.catch(error => {
						console.log(error)
					})

				fetch(`${HOST}/queue/generate`)
					.then(responses => responses.json())
					.then(values => {
						setQrcodeImg(values.dataUrl)
						setLoading(false)
					})
					.catch(error => {
						setLoading(true)
						console.log(error)
					})
			})
			.catch(error => {
				setLoading(true)
				console.log(error)
			})
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			fetch(`${HOST}/queue/settings`)
				.then(responses => responses.json())
				.then(values => {
					setQueueSettings(values)
				})
				.catch(error => {
					setLoading(true)
					console.log(error)
				})

			fetch(`${HOST}/queue/generate`)
				.then(responses => responses.json())
				.then(values => {
					setQrcodeImg(values.dataUrl)
					setLoading(false)
					setCounter(9)
				})
				.catch(error => {
					setLoading(true)
					console.log(error)
				})
		}, 10000)
		return () => clearInterval(interval)
	}, [tempQueueTopic])

	useEffect(() => {
		const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
		return () => clearInterval(timer)
	}, [counter, qrcodeImg])

	useEffect(() => {
		const timer = setTimeout(() => {
			setCardAnimation('')
		}, 700)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className={classes.container}>
			<GridContainer justify="center" style={{ flexWrap: 'nowrap', flexGrow: 2 }}>
				<GridItem xs={12} sm={12} md={10} style={{ alignItems: 'center', display: 'flex' }}>
					<Card className={classes.qrcodeCard}>
						<form className={classes.form}>
							{queueSettings.takingQueueProcess ? (
								<h3 className={`${classes.divider} ${classes.colorRed}`}>
									Fill the form to take the queue.
								</h3>
							) : (
								<h3 className={`${classes.divider} ${classes.colorRed}`}>
									Taking queue is close. Existing queue customer can check status below.
								</h3>
							)}
							<CardBody className={classes.spinnerWrapper} >
								{queueSettings.takingQueueProcess && !queueNumber && !serverErrorMsg ? (
									<QueueDialog
										setQueueNumber={setQueueNumber}
										serverErrorMsg={serverErrorMsg}
										setServerErrorMsg={setServerErrorMsg}
										queueMaxPax={queueSettings.maxPax}
									/>
								) : (
									<QueueInfoDialog
										queueNumber={queueNumber}
										setQueueNumber={setQueueNumber}
										serverErrorMsg={serverErrorMsg}
										setServerErrorMsg={setServerErrorMsg}
									/>
								)}
								<br />
								{!queueEnqMsg && !EnqErrorMsg ? (
									<QueueEnquiryDialog
										setQueueEnqMsg={setQueueEnqMsg}
										// queueEnqMsg={queueEnqMsg}
										EnqErrorMsg={EnqErrorMsg}
										setEnqErrorMsg={setEnqErrorMsg}
									/>
								) : (
									<QueueEnqInfoDialog
										queueEnqMsg={queueEnqMsg}
										setQueueEnqMsg={setQueueEnqMsg}
										EnqErrorMsg={EnqErrorMsg}
										setEnqErrorMsg={setEnqErrorMsg}
									/>
								)}
							</CardBody>
							{/* <CardBody className={classes.spinnerWrapper}>
								{/* {!queueNumber && !serverErrorMsg ? (
									<QueueDialog
										setQueueNumber={setQueueNumber}
										serverErrorMsg={serverErrorMsg}
										setServerErrorMsg={setServerErrorMsg}
									/>
								) : ( */}
							{/* <QueueEnquiryDialog
										queueNumber={queueNumber}
										setQueueNumber={setQueueNumber}
										serverErrorMsg={serverErrorMsg}
										setServerErrorMsg={setServerErrorMsg}
									/> */}
							{/* )} */}
							{/* </CardBody> */}
							{queueSettings.takingQueueProcess && queueSettings.qrCodeFBDisplay && (
								<h3 className={`${classes.divider} ${classes.colorWhite}`} style={{ marginTop: 0 }}>
									Or
								</h3>
							)}
							{queueSettings.takingQueueProcess && queueSettings.qrCodeFBDisplay && (
								<h3 className={`${classes.divider} ${classes.colorRed}`}>
									Scan to Take and Check Queue status with FB Message anywhere. ({outletFullname})
								</h3>
							)}
							{queueSettings.takingQueueProcess && queueSettings.qrCodeFBDisplay && (
								<CardBody className={classes.spinnerWrapper}>
									{loading ? (
										<CircularProgress className={classes.spinner} size={80} />
									) : (
										<img
											className={classes.imgCardTop}
											src={qrcodeImg}
											alt="Card-img-cap"
											id="qrcodeImg"
										/>
									)}
									<h3 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
										QR Code will be refresh in{' '}
										<span className={`${classes.counterNum}`}>{counter}</span>{' '}
										second.
									</h3>
								</CardBody>
							)}
							{/* <CardFooter className={classes.cardFooter}>
								<QueueDialog />
							</CardFooter> */}
						</form>
					</Card>
				</GridItem>
			</GridContainer>
			<div className={classes.logoWrapper} id='logoRow'>
				<img src={ObbaLogo} className={classes.obbaLogoStyle} id='obbaLogo' />
				<img src={Logo} className={classes.logoStyle} id="ollaLogo" />
			</div>
		</div>
	)
}

export default withStyles(qrcodePageStyle)(QrcodePage)
