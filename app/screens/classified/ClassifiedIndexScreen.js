import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';

const ClassifiedIndexScreen = () => {
  const {searchClassifieds, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={searchClassifieds}
        showName={true}
        searchElements={searchParams}
        noElementsTitle={I18n.t('no_classifieds')}
      />
    </BgContainer>
  );
};

export default ClassifiedIndexScreen;

const styles = StyleSheet.create({});
