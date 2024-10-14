import React from 'react'
import { Alert } from 'react-bootstrap'

// variant is color, children is message
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  
  // default light blue color
  variant: 'info',
};

export default Message