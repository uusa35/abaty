import React, {useState, useEffect, useRef, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ProductList} from '../../components/LazyLoadingComponents/productComponents';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions/product';
import {productsSelector} from '../../redux/selectors/collections';
import LoadingBoxedListView from '../../components/Loading/LoadingBoxedListView';
import validate from 'validate.js';
import {last} from 'lodash';

const ProductIndexAllScreen = ({dispatch, products, isLoadingContent}) => {
  const end = useRef();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    end.current = last(currentElements).id;
    if (end.current !== last(products).id) {
      dispatch(getAllProducts());
      setCurrentElements(products);
    }
  }, [products]);

  useMemo(() => {
    if (!validate.isEmpty(products)) {
      setCurrentElements(products);
    }
  }, [currentElements, products]);

  return (
    <ProductList
      products={products}
      showName={true}
      searchElements={{}}
      showSearch={true}
      showFooter={true}
      showRefresh={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    products: productsSelector(state),
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
