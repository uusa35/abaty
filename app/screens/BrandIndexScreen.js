import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';
import {brandsSelector} from './../redux/selectors/collections';

const BrandIndexScreen = ({brands}) => {
  return <BrandList elements={brands} />;
};

function mapStateToProps(state) {
  return {
    brands: brandsSelector(state)
  };
}

export default connect(mapStateToProps)(BrandIndexScreen);

BrandIndexScreen.propTypes = {
  brands: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
