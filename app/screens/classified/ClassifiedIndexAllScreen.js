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
import I18n from './../../I18n';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ClassifiedIndexAllScreen = () => {
  const {classifieds} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClassifieds());
  }, []);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={classifieds}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showClassifiedsFilter={true}
        showSortSearch={true}
        showFooter={true}
        type="classified"
      />
    </BgContainer>
  );
};

export default ClassifiedIndexAllScreen;

const styles = StyleSheet.create({});
