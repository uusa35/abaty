import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ClassifiedIndexScreen = () => {
  const {searchClassifieds, searchParams} = useSelector(state => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(searchClassifieds);
  }, []);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        showName={true}
        searchParams={currentSearchParams}
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
