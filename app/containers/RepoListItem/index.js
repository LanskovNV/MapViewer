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

    const content = (
      <Wrapper>
        <Form onClick={this.props.onClickForm} />
        <RepoLink href="http://localhost:3000/map">
          {item.map_file_name}
        </RepoLink>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={item.map_ID} item={content} />;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
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
