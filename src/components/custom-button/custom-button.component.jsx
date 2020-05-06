import { CustomButtonContainer } from './custom-button.styles';
import React from 'react';

const CustomButton = ({ children, ...otherProps }) => (
	<CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
