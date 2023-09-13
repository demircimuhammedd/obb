import Content from 'components/Content'
import Layout from 'components/Layout'
import PropTypes from 'prop-types'
import React from 'react'

function DashboardIndex({ location }) {
	return (
		<Layout location={location}>
			<Content />
		</Layout>
	)
}
DashboardIndex.propTypes = {
	location: PropTypes.object,
}
export default DashboardIndex
