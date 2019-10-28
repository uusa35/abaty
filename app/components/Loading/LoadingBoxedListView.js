import React, {Fragment, useState} from 'react';
import {View, StyleSheet, ImageBackground, Modal} from 'react-native';
import {isIOS, text, height, width} from './../../constants';
import PropTypes from 'prop-types';
import {first, shuffle} from 'lodash';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';
import {isRTL} from '../../I18n';

const LoadingBoxedListView = ({isLoadingContent}) => {
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
        textAlign: 'left',
        margin: 20,
        padding: 0,
      }}>
      <SvgAnimatedLinearGradient
        height={150}
        width={width}
        style={{marginBottom: 10, alignSelf: 'center'}}>
        <Rect
          x="0"
          y="0"
          width={width}
          height={550}
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={320}
        width="98%"
        style={{margin: 5, alignSelf: 'center'}}>
        <Rect
          x="10"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="10" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="290" rx="3" ry="3" width="200" height="5" />
        <Rect
          x="205"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="205" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="290" rx="3" ry="3" width="200" height="5" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={320}
        width="98%"
        style={{margin: 5, alignSelf: 'center'}}>
        <Rect
          x="10"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="10" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="290" rx="3" ry="3" width="200" height="5" />
        <Rect
          x="205"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="205" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="290" rx="3" ry="3" width="200" height="5" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        height={320}
        width="98%"
        style={{margin: 5, alignSelf: 'center'}}>
        <Rect
          x="10"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="10" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="10" y="290" rx="3" ry="3" width="200" height="5" />
        <Rect
          x="205"
          y="0"
          width="200"
          height="250"
          fill="rgb(0,0,255)"
          strokeWidth="3"
          stroke="rgb(0,0,0)"
        />
        <Rect x="205" y="260" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="270" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="280" rx="3" ry="3" width="200" height="5" />
        <Rect x="205" y="290" rx="3" ry="3" width="200" height="5" />
      </SvgAnimatedLinearGradient>
    </Modal>
  );
};

export default LoadingBoxedListView;

LoadingBoxedListView.propTypes = {
  isLoadingContent: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  columns: PropTypes.number,
};

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
});
