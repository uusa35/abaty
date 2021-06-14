import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CelebritiesList from '../../components/Lists/CelebritiesList';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import BgContainer from '../../components/containers/BgContainer';

const CelebrityIndexScreen = () => {
  const {celebrities, searchParams} = useSelector(state => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(celebrities);
  }, []);

  return (
    <BgContainer showImage={false} white={true}>
      <ElementsHorizontalList
        elements={currentElements}
        type="celebrity"
        searchParams={currentSearchParams}
        showMore={true}
        showSearch={true}
        showFooter={true}
      />
    </BgContainer>
  );
};

export default CelebrityIndexScreen;

const styles = StyleSheet.create({});
