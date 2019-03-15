import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import buttonStyles from '../../components/Button/buttonStyles';

const myButton = ({ className, children }) => (
  <Button className={className}> {children} </Button>
);

export const StyledButton = styled(myButton)`
  ${buttonStyles};
`;

myButton.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired
};
