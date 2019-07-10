/**
 * Created by usamaahmed on 9/27/17.
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import I18n from './../I18n';
import {connect} from 'react-redux';
import {colors, images, text} from './../constants';
import FastImage from 'react-native-fast-image';
import {Icon, Divider} from 'react-native-elements';
import {changeLang, logout} from '../redux/actions';
import {SafeAreaView} from 'react-navigation';
import PropTypes from 'prop-types';
import validate from 'validate.js';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  changeLang = () => {
    const {lang, dispatch} = this.props;
    console.log('the current Lang', lang);
    let newLang = lang === 'ar' ? 'en' : 'ar';
    return dispatch(changeLang(newLang));
  };

  render() {
    const {settings, guest, navigation, dispatch} = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        <SafeAreaView style={{width: '100%', alignItems: 'center'}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.main_theme_color}
          />
          <FastImage
            source={{uri: settings.logo}}
            style={styles.logo}
            resizeMode="contain"
            loadingIndicatorSource={images.logo}
          />
          <Text style={styles.mainMenuText}>{I18n.t('menu')}</Text>
          <Text style={styles.mainMenuText}>{settings.company}</Text>
          <View style={{width: '100%'}}>
            <Divider style={{marginTop: 10}} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.menuBtn}>
              <Icon name="home" type="antdesign" size={20} />
              <Text style={styles.titleStyle}>{I18n.t('home')}</Text>
            </TouchableOpacity>
            {guest ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.menuBtn}>
                <Icon name="login" type="antdesign" size={20} />
                <Text style={styles.titleStyle}>{I18n.t('login')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => dispatch(logout())}
                style={styles.menuBtn}>
                <Icon name="login" type="antdesign" size={20} />
                <Text style={styles.titleStyle}>{I18n.t('logout')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('Contactus')}
              style={styles.menuBtn}>
              <Icon name="old-phone" type="entypo" size={20} />
              <Text style={styles.titleStyle}>{I18n.t('contactus')}</Text>
            </TouchableOpacity>
            {!validate.isEmpty(settings.images) ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ImageZoom', {
                    images: settings.images,
                    name: settings.company,
                    index: 0
                  })
                }
                style={styles.menuBtn}>
                <Icon name="image" type="entypo" size={20} />
                <Text style={styles.titleStyle}>
                  {I18n.t('our_gallery', {name: settings.company})}
                </Text>
              </TouchableOpacity>
            ) : null}

            {settings.youtube ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(settings.youtube)}
                style={styles.menuBtn}>
                <Icon name="youtube" type="entypo" size={20} />
                <Text style={styles.titleStyle}>
                  {I18n.t('our_youtube_channel')}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => this.changeLang()}
              style={styles.menuBtn}>
              <Icon name="language" type="fontawesome" size={20} />
              <Text style={styles.titleStyle}>{I18n.t('lang')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    guest: state.guest,
    lang: state.lang
  };
}

export default connect(mapStateToProps)(Menu);

Menu.propTypes = {
  settings: PropTypes.object.isRequired,
  guest: PropTypes.bool,
  lang: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'transparent'
  },
  titleStyle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15
  },
  logo: {
    width: 120,
    height: 120,
    margin: 12
  },
  menuBtn: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 12,
    borderBottomColor: 'lightgrey'
  },
  mainMenuText: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 20,
    textAlign: 'center'
  }
});
