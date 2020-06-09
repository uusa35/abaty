import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ProductList} from '../../components/LazyLoadingComponents/productComponents';
import PropTypes from 'prop-types';
import {getAllProducts} from '../../redux/actions/product';
import BgContainer from '../../components/containers/BgContainer';

const ProductIndexAllScreen = ({dispatch, products}) => {
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <BgContainer>
      <ProductList
        products={products}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showFooter={true}
        showRefresh={true}
        showSortSearch={true}
        showProductsFilter={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
