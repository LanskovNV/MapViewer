import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import labelStyles from './labelStyles';

const myLabel = ({ className, children }) => (
  <label className={className}> {children} </label>
);

export const StyledLabel = styled(myLabel)`
  ${labelStyles};
`;

myLabel.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired
};
