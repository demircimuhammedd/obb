// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
// @material-ui/icons
// core components
import cardIconStyle from './CardIcon.styles'

const useStyles = makeStyles(cardIconStyle)

export default function CardIcon(props) {
	const classes = useStyles()
	const { className, children, color, ...rest } = props
	const cardIconClasses = classNames({
		[classes.cardIcon]: true,
		[classes[color + 'CardHeader']]: color,
		[className]: className !== undefined,
	})
	return (
		<div className={cardIconClasses} {...rest}>
			{children}
		</div>
	)
}

CardIcon.propTypes = {
	className: PropTypes.string,
	color: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary', 'rose']),
	children: PropTypes.node,
}
