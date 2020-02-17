import React, {useEffect, useState, useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import {getSearchClassifieds} from '../../redux/actions/classified';

const ClassifiedIndexAllScreen = ({
  classifieds,
  dispatch,
}) => {

  useEffect(() => {
    dispatch(getSearchClassifieds({searchParams: {}, redirect : false}));
  }, []);

  return (
    <ClassifiedList
      classifieds={classifieds}
      showName={true}
      searchElements={{}}
    />
  );
};

function mapStateToProps(state) {
  return {
    classifieds: state.classifieds,
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ClassifiedIndexAllScreen);

ClassifiedIndexAllScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
