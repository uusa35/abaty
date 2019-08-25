import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Modal} from 'react-native';
import {isIOS, text, height, width} from './../../constants';
import PropTypes from 'prop-types';
import {first, shuffle} from 'lodash';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';

const LoadingContentView = ({isLoadingContent}) => {
  return (
    <Modal
      animationType="fade"
      visible={isLoadingContent}
      transparent={true}
      style={{
        position: 'absolute',
        top: '10%',
        width,
        height,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10%',
        padding: 0
      }}>
      <SvgAnimatedLinearGradient
        height={600}
        width={width}
        style={{marginBottom: 5, alignSelf: 'center'}}>
        <Rect
          x="0"
          y="0"
          width={width}
          height="600"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={150}
        width={width - 50}
        style={{marginBottom: 5, alignSelf: 'center'}}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={150}
        width={width - 50}
        style={{marginBottom: 5, alignSelf: 'center'}}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={150}
        width={width - 50}
        style={{marginBottom: 5, alignSelf: 'center'}}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="800" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
        <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
      </SvgAnimatedLinearGradient>
    </Modal>
  );
};

export default React.memo(LoadingContentView);

LoadingContentView.propTypes = {
  isLoadingContent: PropTypes.bool.isRequired,
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
