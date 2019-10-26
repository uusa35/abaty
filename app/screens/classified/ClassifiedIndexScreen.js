import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';

const ClassifiedIndexScreen = ({
  classifieds,
  searchParams,
  isLoadingContent
}) => {
  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
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
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent
  };
}

export default connect(mapStateToProps)(ClassifiedIndexScreen);

ClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
