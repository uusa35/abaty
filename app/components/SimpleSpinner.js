import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Spinner from 'react-native-spinkit';
import {iconSizes, text, width} from '../constants/sizes';
import RadialGradient from 'react-native-radial-gradient';
import {isIOS} from '../constants';
import {images} from '../constants/images';
import {APP_CASE} from './../../app';

const SimpleSpinner = ({color = 'black'}) => {
  return (
    <RadialGradient
      style={styles.itemContainerStyle}
      colors={['grey', 'lightgrey', 'white']}
      center={[width / 2, 0]}
      radius={width}>
      <Image
        source={images[APP_CASE]}
        style={{width: 150, height: 100, margin: 10}}
        resizeMode="contain"
      />
      <Spinner type="Arc" color={color} size={iconSizes.medium} />
    </RadialGradient>
  );
};

export default SimpleSpinner;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1,
  },
  loadingText: {
    fontFamily: text.font,
    fontSize: 15,
    color: 'black',
    marginBottom: isIOS ? 35 : 50,
  },
  itemContainerStyle: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#0A3D62',
    overflow: 'hidden',
  },
});
