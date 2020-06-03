import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';

const SearchProductIndexScreen = ({searchProducts, searchParams}) => {
  return (
    <BgContainer showImage={false}>
      <ProductList
        products={searchProducts}
        showName={true}
        showMore={false}
        searchElements={searchParams}
        showSortSearch={true}
        showProductsFilter={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    searchProducts: state.searchProducts,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(SearchProductIndexScreen);

SearchProductIndexScreen.propTypes = {
  searchProducts: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
