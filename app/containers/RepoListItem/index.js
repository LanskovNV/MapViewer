/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import Form from 'containers/HomePage/Form';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import { readMap } from '../App/actions';

export class RepoListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the repository
    // TODO Think of the way to load file and navigate to /map at the same time
    const content = (
      <Wrapper>
        <Form onClick={this.props.onClickForm} />
        <RepoLink href="http://localhost:3000/map">{item}</RepoLink>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={item} item={content} />;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.string,
  onClickForm: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClickForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(readMap('temporary'));
    },
  };
}

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  }),
)(RepoListItem);
