import React, {Fragment, useCallback, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {iconSizes, text, touchOpacity} from '../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import {HOMEKEY, MALLR, ABATI, ESCRAP, EXPO} from './../../../app';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import {getMyClassifieds} from '../../redux/actions/classified';
import {reAuthenticate} from '../../redux/actions/user';
import BgContainer from '../../components/containers/BgContainer';
import CopyRightInfo from '../../components/widgets/setting/CopyRightInfo';
import {useNavigation} from 'react-navigation-hooks';

const ExpoSettingsIndexScreen = ({}) => {
  const {guest, lang, settings, version} = useSelector((state) => state);
  const dispatch = useDispatch();
  const {colors, pages} = settings;
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const handleRefresh = () => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer>
      <ScrollView
        style={{flex: 1, paddingTop: 20}}
        contentContainerStyle={{
          width: '100%',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        <View style={styles.container}>
          {!guest ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('FavoriteProductIndex')}
              style={[styles.btnWrapper]}>
              <Icon
                name="staro"
                type="antdesign"
                size={iconSizes.medium}
                color={colors.icon_theme_color}
              />
              <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && (HOMEKEY || ESCRAP) ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => navigation.navigate('FavoriteClassifiedIndex')}
                style={styles.btnWrapper}>
                <Icon name="staro" type="antdesign" size={iconSizes.medium} />
                <Text style={styles.btnTitle}>
                  {I18n.t('classified_favorites')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => dispatch(getMyClassifieds({redirect: true}))}
                style={styles.btnWrapper}>
                <Icon name="profile" type="antdesign" size={iconSizes.medium} />
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
              <Icon
                name="face-profile"
                type="material-community"
                size={iconSizes.medium}
              />
              <Text style={styles.btnTitle}>{I18n.t('profile')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && !(HOMEKEY || ESCRAP) ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('OrderIndex')}
              style={styles.btnWrapper}>
              <Icon
                name="history"
                type="material-community"
                size={iconSizes.medium}
              />
              <Text style={styles.btnTitle}>{I18n.t('order_history')}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
            style={styles.btnWrapper}>
            <Icon name="language" type="entypo" size={iconSizes.medium} />
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
        <PagesList elements={pages} title={I18n.t('important_links')} />
      </ScrollView>
      <CopyRightInfo version={version} />
    </BgContainer>
  );
};

export default ExpoSettingsIndexScreen;

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
    width: '40%',
    height: 120,
    padding: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'center',
  },
});
