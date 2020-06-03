import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import {
  getAllClassifieds,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import BgContainer from '../../components/containers/BgContainer';

const ClassifiedIndexAllScreen = ({classifieds, dispatch}) => {
  useEffect(() => {
    dispatch(getAllClassifieds());
  }, []);

  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={classifieds}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showClassifiedsFilter={true}
        showSortSearch={true}
        showMore={true}
      />
    </BgContainer>
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
