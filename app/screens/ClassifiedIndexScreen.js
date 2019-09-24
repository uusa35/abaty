import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../components/widgets/classified/ClassifiedList';

const ClassifiedIndexScreen = ({
  classifieds,
  searchParams,
  dispatch,
  colors
}) => {
  return (
    <ClassifiedList
      classifieds={classifieds}
      dispatch={dispatch}
      colors={colors}
      showName={true}
      searchElements={searchParams}
    />
  );
};

function mapStateToProps(state) {
  return {
    classifieds: state.classifieds,
    searchParams: state.searchParams,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ClassifiedIndexScreen);

ClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
