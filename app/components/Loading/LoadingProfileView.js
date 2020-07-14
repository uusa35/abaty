import React from 'react';
import {StyleSheet, View} from 'react-native';
import {width, text} from './../../constants/sizes';
import {isIOS} from '../../constants';
import PropTypes from 'prop-types';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import {Rect} from 'react-native-svg';
import {isRTL} from '../../I18n';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

const LoadingProfileView = () => {
  const {isLoadingProfile} = useSelector((state) => state);
  return (
    <Modal
      visible={isLoadingProfile}
      transparent={true}
      useNativeDriver={true}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
      }}>
      <View style={{backgroundColor: 'white'}}>
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          height={width}
          width={width}
          style={{marginBottom: 10, alignSelf: 'center'}}>
          <Rect
            useNativeDriver={true}
            x="0"
            y="0"
            width={width}
            height={width}
            fill="rgb(0,0,255)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
          />
        </SvgAnimatedLinearGradient>
        {isRTL ? (
          <SvgAnimatedLinearGradient
            useNativeDriver={true}
            height={150}
            width={width}
            style={{marginBottom: 5, alignSelf: 'center'}}>
            <Rect x="0" y="0" rx="4" ry="2" width="250" height="10" />
            <Rect x="0" y="20" rx="3" ry="2" width="250" height="10" />
            <Rect x="0" y="40" rx="3" ry="2" width="250" height="10" />
            <Rect x="0" y="60" rx="3" ry="2" width="250" height="10" />
            <Rect x="0" y="80" rx="3" ry="2" width="250" height="10" />
            <Rect x="0" y="100" rx="3" ry="2" width="250" height="10" />
            <Rect x="0" y="120" rx="3" ry="2" width="250" height="10" />
            <Rect
              x="260"
              y="0"
              width={120}
              height={120}
              fill="rgb(0,0,255)"
              strokeWidth="10"
              stroke="rgb(0,0,0)"
            />
          </SvgAnimatedLinearGradient>
        ) : (
          <SvgAnimatedLinearGradient
            useNativeDriver={true}
            height={150}
            width={width}
            style={{marginBottom: 5, alignSelf: 'center'}}>
            <Rect
              useNativeDriver={true}
              x="0"
              y="0"
              width={120}
              height={120}
              fill="rgb(0,0,255)"
              strokeWidth="3"
              stroke="rgb(0,0,0)"
            />
            <Rect x="125" y="17" rx="4" ry="2" width="300" height="10" />
            <Rect x="125" y="40" rx="3" ry="2" width="300" height="10" />
            <Rect x="125" y="60" rx="3" ry="2" width="300" height="10" />
            <Rect x="125" y="80" rx="3" ry="2" width="300" height="10" />
            <Rect x="125" y="100" rx="3" ry="2" width="300" height="10" />
          </SvgAnimatedLinearGradient>
        )}
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          height={200}
          width={width}
          style={{marginBottom: 10, alignSelf: 'center'}}>
          <Rect
            useNativeDriver={true}
            x="0"
            y="0"
            width={width}
            height="200"
            fill="rgb(0,0,255)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
          />
        </SvgAnimatedLinearGradient>
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          height={50}
          width={width - 50}
          style={{alignSelf: 'center'}}>
          <Rect
            useNativeDriver={true}
            x="0"
            y="0"
            width={width}
            height="50"
            fill="rgb(0,0,255)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
          />
        </SvgAnimatedLinearGradient>
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          height={150}
          width={width - 50}
          style={{marginBottom: 5, alignSelf: 'center'}}>
          <Rect x="0" y="17" rx="4" ry="4" width="800" height="13" />
          <Rect x="0" y="40" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
        </SvgAnimatedLinearGradient>
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          height={250}
          width={width - 50}
          style={{marginBottom: 5, alignSelf: 'center'}}>
          <Rect x="0" y="17" rx="4" ry="4" width="800" height="13" />
          <Rect x="0" y="40" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="160" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="180" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="200" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="220" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="240" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="260" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="280" rx="3" ry="3" width="800" height="10" />
          <Rect x="0" y="300" rx="3" ry="3" width="800" height="10" />
        </SvgAnimatedLinearGradient>
      </View>
    </Modal>
  );
};

export default LoadingProfileView;

LoadingProfileView.propTypes = {
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
