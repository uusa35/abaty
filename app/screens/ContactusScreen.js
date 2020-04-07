import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import SocialRowWidget from '../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../components/widgets/ContactInformationWidget';
import {isIOS} from '../constants';
import validate from 'validate.js';
import {settingsSelector} from '../redux/selectors/collection';

const ContactusScreen = ({settings}) => {
  return (
    <ScrollView
      contentContainerStyle={{minHeight: !isIOS ? '130%' : null}}
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 150}}>
      {!validate.isEmpty(settings) ? (
        <Fragment>
          <SocialRowWidget settings={settings} />
          <ContactInformationWidget settings={settings} />
        </Fragment>
      ) : null}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    settings: settingsSelector(state),
  };
}

export default connect(mapStateToProps)(ContactusScreen);
