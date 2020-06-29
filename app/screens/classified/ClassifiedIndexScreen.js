import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ClassifiedIndexScreen = () => {
  const {searchClassifieds, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={searchClassifieds}
        showName={true}
        searchParams={searchParams}
        showSearch={true}
        showClassifiedsFilter={true}
        showSortSearch={true}
        showFooter={true}
        type="classified"
      />
    </BgContainer>
  );
};

export default ClassifiedIndexScreen;

const styles = StyleSheet.create({});
