import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  bottomContentInset,
  iconSizes,
  text,
  touchOpacity,
} from '../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import {HOMEKEY, MALLR, ABATI, ESCRAP, EXPO} from './../../../app';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import {getMyClassifieds} from '../../redux/actions/classified';
import {reAuthenticate, setRole} from '../../redux/actions/user';
import BgContainer from '../../components/containers/BgContainer';
import CopyRightInfo from '../../components/widgets/setting/CopyRightInfo';
import {useNavigation} from 'react-navigation-hooks';
import {isEmpty, first, filter} from 'lodash';
import {View as Animating} from 'react-native-animatable';

const ExpoSettingsIndexScreen = ({}) => {
  const {guest, lang, settings, version, roles} = useSelector((state) => state);
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

  const handleRegisterClick = () => {
    if (!isEmpty(roles)) {
      dispatch(setRole(first(filter(roles, (r) => r.name === 'Client'))));
    }
    return navigation.navigate('Register');
  };

  return (
    <BgContainer>
      <ScrollView
        // style={{flex: 1, paddingTop: 20}}
        contentContainerStyle={{
          width: '100%',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        <Animating
          animation="bounceIn"
          easing="ease-out"
          useNativeDriver={true}
          style={styles.container}>
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
              <Icon name="face" type="material" size={iconSizes.medium} />
              <Text style={styles.btnTitle}>{I18n.t('profile')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && !(HOMEKEY || ESCRAP) ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('OrderIndex')}
              style={styles.btnWrapper}>
              <Icon name="history" type="material" size={iconSizes.medium} />
              <Text style={styles.btnTitle}>{I18n.t('order_history')}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
            style={styles.btnWrapper}>
            <Icon name="globe" type="font-awesome" size={iconSizes.medium} />
            <Text style={styles.btnTitle}>{I18n.t('lang')}</Text>
          </TouchableOpacity>
        </Animating>
        {guest ? (
          <Animating
            animation="bounceIn"
            easing="ease-out"
            useNativeDriver={true}
            style={{width: '100%'}}>
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
              onPress={() => handleRegisterClick()}
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
          </Animating>
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
