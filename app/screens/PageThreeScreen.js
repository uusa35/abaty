import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';

const PageThreeScreen = ({brands}) => {
  return (
    <View>
      <Text>Test 3 Screen</Text>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    brands: state.brands
  };
}

export default connect(mapStateToProps)(PageThreeScreen);

PageThreeScreen.propTypes = {
  brands: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
