import React, {Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {View} from 'react-native-animatable';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from './../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {changeLang} from '../../redux/actions';
import {HOMEKEY} from './../../../app';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';

const AtSpotSettingsIndexScreen = ({
  guest,
  navigation,
  dispatch,
  lang,
  colors,
  pages,
  element,
  logo,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 150}}
      contentContainerStyle={{
        width: '100%',
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        animation="bounceInRight"
        easing="ease-out"
        useNativeDriver={true}
        style={styles.container}>
        {!guest ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteProductIndex')}
            style={styles.btnWrapper}>
            <Icon name="heart" type="antdesign" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
          </TouchableOpacity>
        ) : null}
        {!guest && HOMEKEY ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteClassifiedIndex')}
            style={styles.btnWrapper}>
            <Icon name="heart" type="antdesign" size={45} />
            <Text style={styles.btnTitle}>
              {I18n.t('classified_favorites')}
            </Text>
          </TouchableOpacity>
        ) : null}
        {!guest ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileIndex', {name: I18n.t('profile')})
            }
            style={styles.btnWrapper}>
            <Icon name="face-profile" type="material-community" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('profile')}</Text>
          </TouchableOpacity>
        ) : null}
        {!guest ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderIndex')}
            style={styles.btnWrapper}>
            <Icon name="history" type="material-community" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('order_history')}</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
          style={styles.btnWrapper}>
          <Icon name="language" type="entypo" size={45} />
          <Text style={styles.btnTitle}>{I18n.t('lang')}</Text>
        </TouchableOpacity>
      </View>
      {guest ? (
        <Fragment>
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('login')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('new_user')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('forget_password')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() => Linking.openURL(`${appUrlIos}/password/reset`)}
          />
        </Fragment>
      ) : null}
      <PagesList elements={pages} title={I18n.t('our_support')} />
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    guest: state.guest,
    lang: state.lang,
    colors: state.settings.colors,
    pages: state.pages,
    element: state.auth,
    logo: state.settings.logo,
  };
}

export default connect(mapStateToProps)(AtSpotSettingsIndexScreen);

AtSpotSettingsIndexScreen.propTypes = {
  guest: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  btnWrapper: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    width: '45%',
    height: 150,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
});
