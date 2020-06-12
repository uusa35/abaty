import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../../components/widgets/product/ProductList';
import BgContainer from '../../components/containers/BgContainer';

const FavoriteProductIndexScreen = ({favorites}) => {
  useEffect(() => {}, [favorites]);

  return (
    <BgContainer>
      <ProductList
        products={favorites}
        searchElements={{}}
        showMore={false}
        showSearch={false}
        showProductsFilter={false}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    favorites: state.productFavorites,
  };
}

export default connect(mapStateToProps)(FavoriteProductIndexScreen);

FavoriteProductIndexScreen.propTypes = {
  favorites: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
