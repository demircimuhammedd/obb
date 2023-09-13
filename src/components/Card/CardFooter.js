// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
// @material-ui/icons
// core components
import cardFooterStyle from './CardFooter.style'

const useStyles = makeStyles(cardFooterStyle)

export default function CardFooter(props) {
	const classes = useStyles()
	const { className, children, plain, profile, stats, chart, ...rest } = props
	const cardFooterClasses = classNames({
		[classes.cardFooter]: true,
		[classes.cardFooterPlain]: plain,
		[classes.cardFooterProfile]: profile,
		[classes.cardFooterStats]: stats,
		[classes.cardFooterChart]: chart,
		[className]: className !== undefined,
	})
	return (
		<div className={cardFooterClasses} {...rest}>
			{children}
		</div>
	)
}

CardFooter.propTypes = {
	className: PropTypes.string,
	plain: PropTypes.bool,
	profile: PropTypes.bool,
	stats: PropTypes.bool,
	chart: PropTypes.bool,
	children: PropTypes.node,
}
