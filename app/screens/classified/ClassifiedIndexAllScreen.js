import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import {
  getAllClassifieds,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import BgContainer from '../../components/containers/BgContainer';

const ClassifiedIndexAllScreen = () => {
  const {classifieds} = useSelector((state) => state);
  const dispatch = useDispatch();

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

export default ClassifiedIndexAllScreen;

const styles = StyleSheet.create({});
