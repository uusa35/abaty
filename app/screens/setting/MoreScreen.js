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
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        endFillColor="white">
        <SocialRowWidget />
        <ContactInformationWidget />
      </ScrollView>
    </BgContainer>
  );
};

export default MoreScreen;
