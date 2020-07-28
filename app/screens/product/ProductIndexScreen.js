import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ProductIndexScreen = () => {
  const {searchProducts, searchParams} = useSelector((state) => state);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    setCurrentSearchParams(searchParams);
  }, []);

  useMemo(() => {
    // if (!validate.isEmpty(products)) {
    setCurrentElements(searchProducts);
    // }
  }, [searchProducts]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={currentSearchParams}
        type="product"
        columns={2}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
        showSortSearch={true}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
      />
    </BgContainer>
  );
};

export default ProductIndexScreen;

const styles = StyleSheet.create({});
