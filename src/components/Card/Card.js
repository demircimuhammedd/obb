import "./Card.css";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import React from 'react'
// @material-ui/icons
// core components
import cardStyle from './Card.styles'

const useStyles = makeStyles(cardStyle)

export default function Card(props) {
	const classes = useStyles()
	const { className, children, plain, profile, chart, ...rest } = props
	const cardClasses = classNames({
		[classes.card]: true,
		[classes.cardPlain]: plain,
		[classes.cardProfile]: profile,
		[classes.cardChart]: chart,
		[className]: className !== undefined,
	})
	return (
		<div className={cardClasses} {...rest}>
			{children}
		</div>
	)
}

Card.propTypes = {
	className: PropTypes.string,
	plain: PropTypes.bool,
	profile: PropTypes.bool,
	chart: PropTypes.bool,
	children: PropTypes.node,
}
