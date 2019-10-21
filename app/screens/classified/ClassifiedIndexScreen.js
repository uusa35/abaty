import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import SimpleSpinner from '../../components/SimpleSpinner';

const ClassifiedIndexScreen = ({classifieds, searchParams}) => {
  return (
    <React.Suspense fallback={<SimpleSpinner />}>
      <ClassifiedList
        classifieds={classifieds}
        showName={true}
        searchElements={searchParams}
      />
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    classifieds: state.classifieds,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(ClassifiedIndexScreen);

ClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
