import React from 'react';
import {Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-animatable';
import {text} from '../../../constants';
import PropTypes from 'prop-types';

const UserImageProfile = ({large, logo, slug}) => {
  return (
    <View animation="bounceInLeft" easing="ease-out" style={styles.elementRow}>
      <FastImage source={{uri: large ? large : logo}} style={styles.logo} />
      <Text style={styles.mainTitle}>{slug}</Text>
    </View>
  );
};

export default React.memo(UserImageProfile);

UserImageProfile.propTypes = {
  large: PropTypes.string,
  logo: PropTypes.string,
  slug: PropTypes.string
};

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  }
});
