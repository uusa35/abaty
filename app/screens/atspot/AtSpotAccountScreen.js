import React, {Fragment} from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from './../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import validate from 'validate.js';
import ShopperImageProfile from '../../components/widgets/user/ShopperImageProfile';
import CollectionGridWidget from '../../components/widgets/collection/CollectionGridWidget';

const AtSpotAccountScreen = ({
  guest,
  dispatch,
  navigation,
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
      {!validate.isEmpty(element) ? (
        <ShopperImageProfile
          member_id={element.id}
          showFans={true}
          showRating={false}
          showComments={false}
          showLike={false}
          isFanned={element.isFanned}
          totalFans={element.totalFans}
          currentRating={element.rating}
          medium={element.medium}
          logo={logo}
          slug={element.slug}
          views={element.views}
          commentsCount={element.commentsCount}
        />
      ) : null}
      {!validate.isEmpty(element.collections) ? (
        <CollectionGridWidget elements={element.collections} />
      ) : null}
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
    colors: state.settings.colors,
    pages: state.pages,
    element: state.auth,
    logo: state.settings.logo,
  };
}

export default connect(mapStateToProps)(AtSpotAccountScreen);

AtSpotAccountScreen.propTypes = {
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
