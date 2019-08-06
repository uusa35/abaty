import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';
import ServiceList from '../components/widgets/service/ServiceList';
import {
  searchParamsSelector,
  servicesSelector
} from '../redux/selectors/collections';

const ServiceIndexScreen = ({services, searchParams}) => {
  return (
    <ServiceList
      elements={services}
      searchElements={searchParams}
      showName={true}
    />
  );
};

function mapStateToProps(state) {
  return {
    services: servicesSelector(state),
    searchParams: searchParamsSelector(state)
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
