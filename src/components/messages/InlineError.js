import React from 'react'
import PropTypes from 'prop-types'

const InlineError = ({text}) => <span style={{color: 'red'}}>{text}</span> 

InlineError.prototype = {
    text: PropTypes.string.isRequired
}

export default InlineError
