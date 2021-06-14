import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import {ABATI} from '../../../app';
import {images} from '../../constants/images';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ServiceIndexScreen = () => {
  const {services, searchParams} = useSelector(state => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(services);
  }, []);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={currentSearchParams}
        type="service"
        searchElements={{}}
        showMore={false}
        showFooter={true}
        showSearch={false}
        showProductsFilter={false}
        emptyListImage={ABATI ? images.emptyProductFavorite : null}
      />
    </BgContainer>
  );
};

export default ServiceIndexScreen;

const styles = StyleSheet.create({});
