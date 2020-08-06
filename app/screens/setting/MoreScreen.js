import React from 'react';
import {ScrollView} from 'react-native';
import SocialRowWidget from '../../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../../components/widgets/ContactInformationWidget';
import BgContainer from '../../components/containers/BgContainer';
import {bottomContentInset, height} from '../../constants/sizes';

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
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        endFillColor="transparent">
        <SocialRowWidget />
        <ContactInformationWidget />
      </ScrollView>
    </BgContainer>
  );
};

export default MoreScreen;
