import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import {getAllProducts} from '../redux/actions/product';
import BgContainer from '../components/containers/BgContainer';
import validate from 'validate.js';
import ElementsHorizontalList from '../components/Lists/ElementsHorizontalList';

const PageTwoScreen = () => {
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

PageTwoScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('products'),
});

export default PageTwoScreen;

const styles = StyleSheet.create({});
