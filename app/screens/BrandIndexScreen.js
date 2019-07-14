import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';

class BrandIndexScreen extends Component {
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

export default connect(mapStateToProps)(BrandIndexScreen);

BrandIndexScreen.propTypes = {
  brands: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
