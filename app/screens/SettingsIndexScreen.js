import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../constants';
import {Icon} from 'react-native-elements';
import I18n from './../I18n';
import {changeLang} from '../redux/actions';

const SettingsIndexScreen = ({guest, navigation, dispatch, lang}) => {
  return (
    <ScrollView contentContainerStyle={{width: '100%'}}>
      <View style={styles.container}>
        {!guest ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('FavoriteProductIndex')}
            style={styles.btnWrapper}>
            <Icon name="staro" type="antdesign" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
          </TouchableOpacity>
        ) : null}
        {!guest ? (
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
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    guest: state.guest,
    lang: state.lang
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
