import React from 'react';
import {StyleSheet, View} from 'react-native';
import {text, width} from './../../constants/sizes';
import {isIOS} from './../../constants';
import PropTypes from 'prop-types';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import {Rect} from 'react-native-svg';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

const LoadingBoxedListView = () => {
  const {isLoadingBoxedList} = useSelector(state => state);
  return (
    <Modal
      visible={isLoadingBoxedList}
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
          width={width}
          height={width / 2}
          style={{marginBottom: 10, alignSelf: 'center'}}>
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
        <SvgAnimatedLinearGradient
          useNativeDriver={true}
          width={width}
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
          useNativeDriver={true}
          height={320}
          width={width}
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
          useNativeDriver={true}
          height={320}
          width={width}
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
      </View>
    </Modal>
  );
};

export default LoadingBoxedListView;

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
