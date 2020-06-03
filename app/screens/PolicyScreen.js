import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {settingsSelector} from '../redux/selectors/collection';
import {width, height} from './../constants/sizes';
import {images} from './../constants/images';
import validate from 'validate.js';

const PolicyScreen = ({settings}) => {
  const {policy, main_bg} = settings;
  return (
    <ImageBackground
      source={{
        uri: main_bg,
      }}
      loadingIndicatorSource={images.logo}
      style={{width, height}}
      resizeMode="stretch">
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10, marginBottom: '5%'}}
        contentInset={{bottom: 100}}>
        {!validate.isEmpty(policy) && policy.length > 100 ? (
          <WebView
            showsVerticalScrollIndicator={false}
            source={{html: policy}}
            style={{width: '100%', height, marginTop: 10}}
          />
        ) : null}
      </ScrollView>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    settings: settingsSelector(state),
  };
}

export default connect(mapStateToProps)(PolicyScreen);
