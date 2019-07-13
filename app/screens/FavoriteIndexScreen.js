import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import I18n from './../I18n';

class FavoriteIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {productFavorites, navigation, searchParams} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ProductList
          elements={productFavorites}
          showName={true}
          showSearch={false}
          title={I18n.t('wishlist')}
          showTitle={false}
          showMore={false}
          showFooter={false}
          searchElements={searchParams}
        />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    productFavorites: state.productFavorites,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(FavoriteIndexScreen);

FavoriteIndexScreen.propTypes = {
  productFavorites: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
