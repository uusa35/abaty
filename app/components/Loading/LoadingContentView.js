import React, {Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {text, width, height} from './../../constants/sizes';
import {isIOS} from './../../constants';
import PropTypes from 'prop-types';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import {Circle, Rect} from 'react-native-svg';
import {isRTL} from '../../I18n';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

const LoadingContentView = () => {
  const {isLoadingContent} = useSelector((state) => state);
  return (
    <Modal
      visible={isLoadingContent}
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
          style={{marginBottom: 5, alignSelf: 'center'}}>
          <Rect
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
          <Fragment>
            <SvgAnimatedLinearGradient
              useNativeDriver={true}
              height={150}
              width={width - 50}
              style={{marginBottom: 5, alignSelf: 'center'}}>
              <Circle cx="320" cy="30" r="30" />
              <Rect x="20" y="17" rx="4" ry="4" width="250" height="13" />
              <Rect x="20" y="40" rx="3" ry="3" width="250" height="10" />
              <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
            </SvgAnimatedLinearGradient>
            <SvgAnimatedLinearGradient
              useNativeDriver={true}
              height={150}
              width={width - 50}
              style={{marginBottom: 5, alignSelf: 'center'}}>
              <Circle cx="320" cy="30" r="30" />
              <Rect x="20" y="17" rx="4" ry="4" width="250" height="13" />
              <Rect x="20" y="40" rx="3" ry="3" width="250" height="10" />
              <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
            </SvgAnimatedLinearGradient>
            <SvgAnimatedLinearGradient
              useNativeDriver={true}
              height={150}
              width={width - 50}
              style={{marginBottom: 5, alignSelf: 'center'}}>
              <Rect x="20" y="17" rx="4" ry="4" width="250" height="13" />
              <Rect x="20" y="40" rx="3" ry="3" width="250" height="10" />
              <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
            </SvgAnimatedLinearGradient>
          </Fragment>
        ) : (
          <Fragment>
            <SvgAnimatedLinearGradient
              useNativeDriver={true}
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
              useNativeDriver={true}
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
              useNativeDriver={true}
              height={150}
              width={width - 50}
              style={{marginBottom: 5, alignSelf: 'center'}}>
              <Rect x="0" y="0" rx="4" ry="4" width="800" height="10" />
              <Rect x="0" y="20" rx="4" ry="4" width="800" height="10" />
              <Rect x="0" y="40" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="60" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="80" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="100" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="120" rx="3" ry="3" width="800" height="10" />
              <Rect x="0" y="140" rx="3" ry="3" width="800" height="10" />
            </SvgAnimatedLinearGradient>
          </Fragment>
        )}
      </View>
    </Modal>
  );
};

export default LoadingContentView;

LoadingContentView.propTypes = {
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
