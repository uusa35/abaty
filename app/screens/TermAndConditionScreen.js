import React from 'react';
import {ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {bottomContentInset, height} from './../constants/sizes';
import validate from 'validate.js';
import NoMoreElements from '../components/widgets/NoMoreElements';
import I18n from '../I18n';
import BgContainer from '../components/containers/BgContainer';

const TermAndConditionScreen = () => {
  const {terms} = useSelector(state => state.settings);
  return (
    <BgContainer showImage={false} white={false}>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          margin: 15,
          paddingBottom: '15%',
          alignSelf: 'center',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'transparent',
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        }}
        contentInset={{bottom: bottomContentInset}}>
        {!validate.isEmpty(terms) && terms.length > 80 ? (
          <WebView
            javaScriptEnabled={true}
            showsVerticalScrollIndicator={false}
            source={{html: terms}}
            containerStyle={{
              width: '100%',
              padding: 10,
              backgroundColor: 'white',
            }}
          />
        ) : (
          <NoMoreElements title={I18n.t('not_available')} />
        )}
      </ScrollView>
    </BgContainer>
  );
};

export default TermAndConditionScreen;
