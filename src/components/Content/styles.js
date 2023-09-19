import { container } from '../GeneralStyle/index.js'


const qrcodePageStyle = {
	container: {
		...container,
		color: '#FFFFFF',
		width: '100%',
		height: '100%',
		margin: 'auto',
		zIndex: 2,
		position: 'relative',
		padding: 0,
		paddingTop: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		maxWidth: '100% !important',
	},
	cardHidden: {
		opacity: '0',
		transform: 'translate3d(0, -60px, 0)',
	},
	form: {
		margin: '0',
	},
	cardHeader: {
		width: 'auto',
		textAlign: 'center',
		marginLeft: '20px',
		marginRight: '20px',
		marginTop: '-40px',
		padding: '20px 0',
		marginBottom: '15px',
	},
	socialIcons: {
		maxWidth: '24px',
		marginTop: '0',
		width: '100%',
		transform: 'none',
		left: '0',
		top: '0',
		height: '100%',
		lineHeight: '41px',
		fontSize: '20px',
	},
	divider: {
		marginTop: '15px',
		marginBottom: '0px',
		textAlign: 'center',
	},
	cardFooter: {
		paddingTop: '0rem',
		border: '0',
		borderRadius: '6px',
		justifyContent: 'center !important',
		marginBottom: '20px',
	},
	socialLine: {
		marginTop: '1rem',
		textAlign: 'center',
		padding: '0',
	},
	inputIconsColor: {
		color: '#495057',
	},
	qrcodeCard: {
		padding: '20px',
	},
	spinnerWrapper: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	spinner: {
		marginTop: '3rem',
		marginBottom: '3rem',
	},
	takeQueue: {
		marginTop: '-30px',
		paddingBottom: '20px',
	},
	// hidden: {
	// 	display: 'none',
	// },
	colorRed: {
		color: '#ff3644',
		textTransform: 'uppercase',
	},
	colorOrange: {
		color: '#ff5531',
		textTransform: 'uppercase',
	},
	colorWhite: {
		color: '#fafafa',
	},
	dividerText: {
		color: '#ff5656',
		textTransform: 'uppercase',
	},
	counterNum: {
		fontSize: '2rem',
		fontWeight: 800,
		paddingRight: '3px',
		color: '#ff5656',
	},
	logoWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: '20px',
	},
	logoStyle: {
		maxWidth: '120px',
		bottom: '0',
		right: '10px',
		marginBottom: '0px',
		marginLeft: '0px',
	},
	obbaLogoStyle: {
		bottom: '0',
		left: 0,
		marginBottom: '0px',
		marginLeft: '0px',
	},
}

export default qrcodePageStyle
