import React from 'react';
import {View, ImageBackground, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {settingsSelector} from '../redux/selectors/collection';
import I18n from './../I18n';
import {width, height, text} from './../constants/sizes';
import {images} from './../constants/images';
import {Divider} from 'react-native-elements';

const TermAndConditionScreen = ({settings}) => {
  const {logo, terms, policy, main_bg, menu_bg, colors} = settings;
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
        contentContainerStyle={{padding: 25}}
        contentInset={{bottom: 100}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: 25,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('terms')}
          </Text>
          <Divider style={{backgroundColor: colors.header_one_theme_bg}} />
          <View
            style={{
              borderColor: 'lightgrey',
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'left',
                lineHeight: text.xlarge,
              }}>
              {terms}
            </Text>
          </View>
        </View>
        <Divider
          style={{
            backgroundColor: colors.header_one_theme_bg,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('policies')}
          </Text>
          <Divider style={{backgroundColor: colors.header_one_theme_bg}} />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              width: '100%',
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'left',
                lineHeight: text.xlarge,
              }}>
              {policy}
            </Text>
          </View>
        </View>
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
