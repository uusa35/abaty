import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';

const ClassifiedIndexScreen = ({searchClassifieds, searchParams}) => {
  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={searchClassifieds}
        showName={true}
        searchElements={searchParams}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    searchClassifieds: state.searchClassifieds,
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ClassifiedIndexScreen);

ClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
