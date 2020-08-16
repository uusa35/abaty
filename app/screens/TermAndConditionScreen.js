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
  const {terms} = useSelector((state) => state.settings);
  return (
    <BgContainer>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          padding: 10,
          paddingBottom: '15%',
          justifyContent: 'center',
        }}
        contentInset={{bottom: bottomContentInset}}>
        {!validate.isEmpty(terms) && terms.length > 100 ? (
          <WebView
            showsVerticalScrollIndicator={false}
            source={{html: terms}}
            style={{width: '100%', height, marginTop: 10}}
          />
        ) : (
          <NoMoreElements title={I18n.t('not_available')} />
        )}
      </ScrollView>
    </BgContainer>
  );
};

export default TermAndConditionScreen;
