import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import BrandWidget from './BrandWidget';
import {map} from 'lodash';
import {View} from 'react-native-animatable';

const BrandList = ({elements, showName = false}) => {
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
      showsHorizontalScrollIndicator={false}
      endFillColor="white"
      showsVerticalScrollIndicator={false}>
      <View
        animation="bounceInLeft"
        easing="ease-out"
        style={styles.wrapper}
        useNativeDriver={true}>
        {map(elements, (b, i) => (
          <BrandWidget
            element={b}
            key={i}
            currentWidth={100}
            currentMarginBottom={20}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default BrandList;

BrandList.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
});
