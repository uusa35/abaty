import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import SocialRowWidget from '../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../components/widgets/ContactInformationWidget';
import validate from 'validate.js';
import {bottomContentInset} from '../constants/sizes';
import BgContainer from '../components/containers/BgContainer';

const ContactusScreen = () => {
  const {settings} = useSelector((state) => state);
  return (
    <BgContainer>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}>
        {!validate.isEmpty(settings) && (
          <Fragment>
            <SocialRowWidget settings={settings} />
            <ContactInformationWidget settings={settings} />
          </Fragment>
        )}
      </ScrollView>
    </BgContainer>
  );
};

export default ContactusScreen;
