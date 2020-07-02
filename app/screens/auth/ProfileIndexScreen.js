import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import {bottomContentInset, text} from '../../constants/sizes';
import {isIOS} from '../../constants';
import validate from 'validate.js';
import {isRTL} from '../../I18n';
import UserProfileInformationWidget from '../../components/widgets/user/UserProfileInformationWidget';
import UserProfileBtns from '../../components/widgets/user/UserProfileBtns';
import BgContainer from '../../components/containers/BgContainer';
import {HOMEKEY} from './../../../app';

const ProfileIndexScreen = () => {
  const {auth} = useSelector((state) => state);

  return (
    <BgContainer showImage={!HOMEKEY}>
      <ScrollView
        contentContainerStyle={{minHeight: !isIOS ? '120%' : null}}
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}>
        {!validate.isEmpty(auth) ? (
          <View style={{marginTop: '10%'}}>
            <UserProfileInformationWidget auth={auth} />
            <UserProfileBtns />
          </View>
        ) : null}
      </ScrollView>
    </BgContainer>
  );
};

export default ProfileIndexScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
