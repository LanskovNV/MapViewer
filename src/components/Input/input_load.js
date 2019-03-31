import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import inputStyles from './inputStyles';

const myInput = ({ className, children }) => (
  <input className={className}> {children} </input>
);

export const InputLoad = styled(myInput)`
  ${inputStyles};
`;

myInput.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired
};
