import React from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import {text, height, width} from './../../constants/sizes';
import {isIOS} from './../../constants';
import PropTypes from 'prop-types';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, {Circle, Rect} from 'react-native-svg';
import {isRTL} from '../../I18n';
import {useSelector} from 'react-redux';

const LoadingContentView = () => {
  const {isLoadingContent} = useSelector((state) => state);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Modal
        animationType="fade"
        visible={isLoadingContent}
        transparent={false}
        style={{
          position: 'absolute',
          top: '10%',
          width,
          height,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          // margin: '10%',
          padding: 0,
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
        {isRTL ? (
          <SvgAnimatedLinearGradient
            height={150}
            width={width - 25}
            style={{marginBottom: 5, alignSelf: 'center'}}>
            <Circle cx="320" cy="30" r="30" />
            <Rect x="20" y="17" rx="4" ry="4" width="250" height="13" />
            <Rect x="20" y="40" rx="3" ry="3" width="250" height="10" />
            <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
          </SvgAnimatedLinearGradient>
        ) : (
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
            <Rect x="0" y="160" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="180" rx="3" ry="3" width="800" height="10" />
          </SvgAnimatedLinearGradient>
        )}
        {isRTL ? (
          <SvgAnimatedLinearGradient
            height={150}
            width="98%"
            style={{marginBottom: 5, alignSelf: 'center'}}>
            <Circle cx="320" cy="30" r="30" />
            <Rect x="20" y="17" rx="4" ry="4" width="250" height="13" />
            <Rect x="20" y="40" rx="3" ry="3" width="250" height="10" />
            <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
            <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
          </SvgAnimatedLinearGradient>
        ) : (
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
        )}
        <SvgAnimatedLinearGradient
          height={150}
          width={width - 50}
          style={{marginBottom: 5, alignSelf: 'center'}}>
          <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
        </SvgAnimatedLinearGradient>
      </Modal>
    </View>
  );
};

export default LoadingContentView;

LoadingContentView.propTypes = {
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
