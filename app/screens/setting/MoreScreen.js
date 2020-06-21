import React from 'react';
import {ScrollView} from 'react-native';
import SocialRowWidget from '../../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../../components/widgets/ContactInformationWidget';
import BgContainer from '../../components/containers/BgContainer';
import {bottomContentInset} from '../../constants/sizes';

const MoreScreen = () => {
  return (
    <BgContainer>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}>
        <SocialRowWidget />
        <ContactInformationWidget />
      </ScrollView>
    </BgContainer>
  );
};

export default MoreScreen;
