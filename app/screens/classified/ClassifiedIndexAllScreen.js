import React, {useEffect, useState, useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import {getSearchClassifieds} from '../../redux/actions/classified';
import {first} from 'lodash';
import validate from 'validate.js';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';

const ClassifiedIndexAllScreen = ({
  classifieds,
  dispatch,
  isLoadingContent,
}) => {
  const ref = useRef();
  const [currentClassifieds, setCurrentClassifieds] = useState([]);

  useEffect(() => {
    dispatch(getSearchClassifieds({searchParams: {}}));
  }, []);

  useEffect(() => {
    ref.current = first(currentClassifieds).id;
    if (ref.current !== first(classifieds).id) {
      dispatch(getSearchClassifieds({searchParams: {}}));
      setCurrentClassifieds(classifieds);
    }
  }, [classifieds]);

  useMemo(() => {
    if (!validate.isEmpty(classifieds)) {
      setCurrentClassifieds(classifieds);
    }
  }, [currentClassifieds, classifieds]);

  return (
    <React.Suspense
      fallback={<LoadingBoxedListView isLoadingContent={isLoadingContent} />}>
      <ClassifiedList
        classifieds={classifieds}
        showName={true}
        searchElements={{}}
      />
    </React.Suspense>
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
