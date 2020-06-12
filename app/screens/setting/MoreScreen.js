import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import SocialRowWidget from '../../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../../components/widgets/ContactInformationWidget';
import validate from 'validate.js';
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
        <Fragment>
          <SocialRowWidget />
          <ContactInformationWidget />
        </Fragment>
      </ScrollView>
    </BgContainer>
  );
};

export default MoreScreen;
