import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {isIOS, text} from './../../constants';
import PropTypes from 'prop-types';
import {first, shuffle} from 'lodash';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';

const LoadingContentView = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      }}>
      <SvgAnimatedLinearGradient height={200} width={350}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient height={200} width={350}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient height={200} width={350}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient height={200} width={350}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

export default React.memo(LoadingContentView);

LoadingContentView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1
  },
  loadingText: {
    fontFamily: text.font,
    fontSize: 15,
    color: 'black',
    marginBottom: isIOS ? 35 : 50
  }
});
