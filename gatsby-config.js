const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log(`Using environment config: '${activeEnv}'`)
require('dotenv').config({
	path: `.env.${activeEnv}`,
})

module.exports = {
	siteMetadata: {
		title: `Obba admin Dashboard`,
		author: `Cloude8`,
		description: `Obba admin dashboard`,
		siteUrl: `http://obba-jj-qrcode-prod.s3-website-ap-southeast-1.amazonaws.com`,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-material-ui`,
		},
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: process.env.S3_BUCKET_NAME,
				acl: 'private',
				region: process.env.AWSIOT_REGION,
			},
		},
	],
}
