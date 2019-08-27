import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';
import {setProducts} from '../redux/actions/sagas/requestSagas';
import {
  productsSelector,
  servicesSelector
} from '../redux/selectors/collections';
import {colorsSelector} from '../redux/selectors/collection';
import ServiceList from '../components/widgets/service/ServiceList';

const ServiceIndexAllScreen = ({services, colors, dispatch}) => {
  return (
    <ServiceList
      elements={services}
      searchElements={{}}
      showName={true}
      colors={colors}
      dispatch={dispatch}
    />
  );
};

function mapStateToProps(state) {
  return {
    services: servicesSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(ServiceIndexAllScreen);

ServiceIndexAllScreen.propTypes = {
  services: PropTypes.array.isRequired,
  colors: PropTypes.object
};

const styles = StyleSheet.create({});
