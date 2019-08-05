import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {getSearchProducts} from '../redux/actions';
import {setProducts} from '../redux/actions/sagas/requestSagas';

class ProductIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {products, navigation, searchParams} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ProductList
          elements={products}
          showName={true}
          searchElements={searchParams}
        />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(ProductIndexScreen);

ProductIndexScreen.propTypes = {
  products: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
