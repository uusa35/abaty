import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';
import ServiceList from '../components/widgets/service/ServiceList';
import {
  searchParamsSelector,
  servicesSelector
} from '../redux/selectors/collections';
import {colorsSelector} from '../redux/selectors/collection';

const ServiceIndexScreen = ({services, searchParams, colors, dispatch}) => {
  return (
    <ServiceList
      elements={services}
      searchElements={searchParams}
      showName={true}
      colors={colors}
      dispatch={dispatch}
    />
  );
};

function mapStateToProps(state) {
  return {
    services: servicesSelector(state),
    searchParams: searchParamsSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
