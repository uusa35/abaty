import React from 'react';
import {ScrollView} from 'react-native';
import SocialRowWidget from '../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../components/widgets/ContactInformationWidget';
import {bottomContentInset} from '../constants/sizes';
import BgContainer from '../components/containers/BgContainer';

const ContactusScreen = () => {
  return (
    <BgContainer showImage={true}>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}>
        <SocialRowWidget />
        <ContactInformationWidget />
      </ScrollView>
    </BgContainer>
  );
};

export default ContactusScreen;
