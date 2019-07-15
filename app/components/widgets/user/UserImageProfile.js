import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-animatable';
import {text} from '../../../constants';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const UserImageProfile = ({large, logo, slug}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View animation="bounceInLeft" easing="ease-out" style={styles.elementRow}>
      <FastImage source={{uri: large ? large : logo}} style={styles.logo} />
      <Text style={[styles.mainTitle, {color: colors.header_tow_theme_color}]}>
        {slug}
      </Text>
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
    fontSize: text.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  }
});
