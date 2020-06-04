import React, {Fragment, useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bottomContentInset, text, touchOpacity} from '../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import {HOMEKEY, MALLR, ABATI, ESCRAP} from './../../../app';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import {getMyClassifieds} from '../../redux/actions/classified';
import {reAuthenticate} from '../../redux/actions/user';
import BgContainer from '../../components/containers/BgContainer';
import CopyRightInfo from '../../components/widgets/setting/CopyRightInfo';

const SettingsIndexScreen = ({
  guest,
  lang,
  pages,
  dispatch,
  colors,
  navigation,
  version,
}) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{
          width: '100%',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        contentInset={{bottom: bottomContentInset}}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        <View style={styles.container}>
          {!guest && (MALLR || ABATI) ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('FavoriteProductIndex')}
              style={styles.btnWrapper}>
              <Icon name="staro" type="antdesign" size={45} />
              <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && (HOMEKEY || ESCRAP) ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => navigation.navigate('FavoriteClassifiedIndex')}
                style={styles.btnWrapper}>
                <Icon name="staro" type="antdesign" size={45} />
                <Text style={styles.btnTitle}>
                  {I18n.t('classified_favorites')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => dispatch(getMyClassifieds({redirect: true}))}
                style={styles.btnWrapper}>
                <Icon name="profile" type="antdesign" size={45} />
                <Text style={styles.btnTitle}>{I18n.t('my_classifieds')}</Text>
              </TouchableOpacity>
            </Fragment>
          ) : null}
          {!guest ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() =>
                navigation.navigate('ProfileIndex', {name: I18n.t('profile')})
              }
              style={styles.btnWrapper}>
              <Icon name="face-profile" type="material-community" size={45} />
              <Text style={styles.btnTitle}>{I18n.t('profile')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && !(HOMEKEY || ESCRAP) ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('OrderIndex')}
              style={styles.btnWrapper}>
              <Icon name="history" type="material-community" size={45} />
              <Text style={styles.btnTitle}>{I18n.t('order_history')}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
            style={styles.btnWrapper}>
            <Icon name="language" type="entypo" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('lang')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => navigation.navigate('Contactus')}
            style={styles.btnWrapper}>
            <Icon name="mobile1" type="antdesign" size={45} />
            <Text style={styles.btnTitle}>{I18n.t('contactus')}</Text>
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
              onPress={() => Linking.openURL(`${appUrlIos}password/reset`)}
            />
          </Fragment>
        ) : null}
        <PagesList elements={pages} title={I18n.t('our_support')} />
      </ScrollView>
      <CopyRightInfo version={version} />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    guest: state.guest,
    lang: state.lang,
    colors: state.settings.colors,
    pages: state.pages,
    version: state.version,
  };
}

export default connect(mapStateToProps)(SettingsIndexScreen);

SettingsIndexScreen.propTypes = {
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
    height: 120,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'center',
  },
});
