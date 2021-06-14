import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Linking,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  bottomContentInset,
  iconSizes,
  text,
  touchOpacity,
} from './../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import validate from 'validate.js';
import ShopperImageProfile from '../../components/widgets/user/ShopperImageProfile';
import CollectionGridWidget from '../../components/widgets/collection/CollectionGridWidget';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import BgContainer from '../../components/containers/BgContainer';
import {width} from '../../constants';
import {reAuthenticate} from '../../redux/actions/user';

const MallrAccountScreen = ({navigation}) => {
  const {guest, auth, settings} = useSelector(state => state);
  const {colors, pages, logo} = settings;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer enableMargin={true} marginVal={width / 15}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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
        {!validate.isEmpty(auth) && (
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
        )}
        {!validate.isEmpty(auth.collections) && (
          <CollectionGridWidget elements={auth.collections} />
        )}
        {guest ? (
          <View
            style={{
              marginTop: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            {guest && (
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() =>
                  dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))
                }
                style={styles.btnWrapper}>
                <Icon
                  name="globe"
                  type="font-awesome"
                  size={iconSizes.medium}
                />
                <Text style={styles.btnTitle}>{I18n.t('lang')}</Text>
              </TouchableOpacity>
            )}
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
    </BgContainer>
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
