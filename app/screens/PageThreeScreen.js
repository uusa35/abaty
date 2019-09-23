import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UsersList from '../components/Lists/UsersList';

const PageThreeScreen = ({companies, dispatch}) => {
  return (
    <UsersList
      dispatch={dispatch}
      elements={companies}
      showMore={true}
      searchParams={{}}
    />
  );
};

function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

export default connect(mapStateToProps)(PageThreeScreen);

PageThreeScreen.propTypes = {
  brands: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
