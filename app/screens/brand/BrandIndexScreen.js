import React from 'react';
import {StyleSheet} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../../components/widgets/brand/BrandList';

const BrandIndexScreen = () => {
  const {brands} = useSelector((state) => state);
  return <BrandList elements={brands} />;
};

export default BrandIndexScreen;

const styles = StyleSheet.create({});
