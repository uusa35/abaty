import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';

const PageFourScreen = () => {
  const {brands} = useSelector((state) => state);
  return (
    <View>
      <Text>Test 3 Screen</Text>
    </View>
  );
};

export default PageFourScreen;

PageFourScreen.propTypes = {
  brands: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({});
