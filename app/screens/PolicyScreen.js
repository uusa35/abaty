import React from 'react';
import {ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {bottomContentInset, height} from './../constants/sizes';
import validate from 'validate.js';
import BgContainer from '../components/containers/BgContainer';

const PolicyScreen = () => {
  const {policy} = useSelector((state) => state.settings);
  return (
    <BgContainer>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10, paddingBottom: '15%'}}
        contentInset={{bottom: bottomContentInset}}>
        {!validate.isEmpty(policy) && policy.length > 100 && (
          <WebView
            showsVerticalScrollIndicator={false}
            source={{html: policy}}
            style={{width: '100%', height, marginTop: 10}}
          />
        )}
      </ScrollView>
    </BgContainer>
  );
};

export default PolicyScreen;
