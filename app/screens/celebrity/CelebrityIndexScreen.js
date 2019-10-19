import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CelebritiesList from '../../components/Lists/CelebritiesList';

const CelebrityIndexScreen = ({celebrities, searchParams, dispatch}) => {
  return (
    <CelebritiesList
      elements={celebrities}
      searchElements={searchParams}
      dispatch={dispatch}
      showMore={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    celebrities: state.celebrities,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(CelebrityIndexScreen);

CelebrityIndexScreen.propTypes = {
  users: PropTypes.array
};

const styles = StyleSheet.create({});
