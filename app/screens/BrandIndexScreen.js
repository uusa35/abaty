import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {text, links} from '../constants';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';

class BrandShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {brands} = this.props;
    return <BrandList elements={brands} />;
  }
}

function mapStateToProps(state) {
  return {
    brands: state.brands
  };
}

export default connect(mapStateToProps)(BrandShowScreen);

BrandShowScreen.propTypes = {
  brands: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
