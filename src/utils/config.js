export const HOST = process.env.HOST
export const awsIotConfig = {
	region: process.env.AWSIOT_REGION,
	protocol: process.env.AWSIOT_PROTOCOL,
	accessKeyId: process.env.AWSIOT_ACCESS_KEY_ID,
	secretKey: process.env.AWSIOT_SECRET_KEY,
	port: 443,
	host: process.env.AWSIOT_HOST,
}
export const [env] = HOST.split('/').slice(-1)

export const company = process.env.COMPANY
export const outletAbbr = process.env.OUTLET_ABBR

export const getOutletFullname = outletAbbr => {
	let outletFullname
	switch (outletAbbr) {
		case 'BT':
			outletFullname = 'O.BBa Bukit Timah'
			break
		case 'BJJ':
			outletFullname = 'O.BBa BBQ & Jjajang'
			break
		case 'TP':
			outletFullname = 'O.BBa BBQ Tanjong Pagar'
			break
		case 'JJ':
			outletFullname = 'O.BBa Jjajang'
			break
	}
	return outletFullname
}