import React from 'react';
import {StyleSheet, ScrollView, Linking, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from './../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import validate from 'validate.js';
import ShopperImageProfile from '../../components/widgets/user/ShopperImageProfile';
import CollectionGridWidget from '../../components/widgets/collection/CollectionGridWidget';
import {useNavigation} from 'react-navigation-hooks';

const MallrAccountScreen = () => {
  const {guest, auth, settings} = useSelector((state) => state);
  const {colors, pages, logo} = settings;
  const navigation = useNavigation();

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
      {!validate.isEmpty(auth) ? (
        <ShopperImageProfile
          member_id={auth.id}
          showFans={true}
          showRating={false}
          showComments={false}
          showLike={false}
          isFanned={auth.isFanned}
          totalFans={auth.totalFans}
          currentRating={auth.rating}
          medium={auth.medium}
          logo={logo}
          slug={auth.slug}
          views={auth.views}
          commentsCount={auth.commentsCount}
        />
      ) : null}
      {!validate.isEmpty(auth.collections) ? (
        <CollectionGridWidget elements={auth.collections} />
      ) : null}
      {guest ? (
        <View
          style={{
            marginTop: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
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
        </View>
      ) : null}
      <PagesList elements={pages} title={I18n.t('our_support')} />
    </ScrollView>
  );
};

export default MallrAccountScreen;

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
