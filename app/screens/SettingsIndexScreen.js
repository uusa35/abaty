import React, {Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Linking
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../constants';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../I18n';
import {changeLang, getUsers} from '../redux/actions';
import {HOMEKEY} from './../../app';
import {appUrlIos} from '../env';
import widgetStyles from '../components/widgets/widgetStyles';

const SettingsIndexScreen = ({
  guest,
  navigation,
  dispatch,
  lang,
  colors,
  pages
}) => {
  console.log('pages', pages);
  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        padding: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
      <View style={styles.container}>
        {!guest ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteProductIndex')}
            style={styles.btnWrapper}>
            <Icon name="staro" type="antdesign" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
          </TouchableOpacity>
        ) : null}
        {!guest && HOMEKEY ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteClassifiedIndex')}
            style={styles.btnWrapper}>
            <Icon name="staro" type="antdesign" size={45} />
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
              borderRadius: 0
            }}
            title={I18n.t('new_user')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0
            }}
            title={I18n.t('forget_password')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
            onPress={() => Linking.openURL(`${appUrlIos}/password/reset`)}
          />
        </Fragment>
      ) : null}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    guest: state.guest,
    lang: state.lang,
    colors: state.settings.colors,
    pages: state.pages
  };
}

export default connect(mapStateToProps)(SettingsIndexScreen);

SettingsIndexScreen.propTypes = {
  guest: PropTypes.bool.isRequired
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
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
    marginBottom: 20
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium
  }
});
