import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions/product';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import validate from 'validate.js';

const ProductIndexAllScreen = () => {
  const {products} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useMemo(() => {
    if (!validate.isEmpty(products)) {
      setCurrentElements(products);
    }
  }, [products]);

  return (
    <BgContainer>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={{}}
        type="product"
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

export default ProductIndexAllScreen;

const styles = StyleSheet.create({});

{
  /*<ProductList*/
}
{
  /*    products={products}*/
}
{
  /*    showName={true}*/
}
{
  /*    searchElements={{}}*/
}
{
  /*    showSearch={true}*/
}
{
  /*    showFooter={true}*/
}
{
  /*    showRefresh={true}*/
}
{
  /*    showSortSearch={true}*/
}
{
  /*    showProductsFilter={true}*/
}
{
  /*/>*/
}
