import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {settingsSelector} from '../redux/selectors/collection';
import {width, height} from './../constants/sizes';
import {images} from './../constants/images';
import validate from 'validate.js';
import NoMoreElements from '../components/widgets/NoMoreElements';
import I18n from '../I18n';

const TermAndConditionScreen = ({settings}) => {
  const {terms, main_bg} = settings;
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
        contentContainerStyle={{
          flex: 1,
          padding: 10,
          marginBottom: '5%',
          justifyContent: 'center',
        }}
        contentInset={{bottom: 100}}>
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
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    settings: settingsSelector(state),
  };
}

export default connect(mapStateToProps)(React.memo(TermAndConditionScreen));
