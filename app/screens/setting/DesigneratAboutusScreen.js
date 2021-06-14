import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import {bottomContentInset} from '../../constants/sizes';
import widgetStyles from '../../components/widgets/widgetStyles';
import {useSelector} from 'react-redux';
import I18n from './../../I18n';

const DesigneratAboutusScreen = () => {
  const {settings} = useSelector(state => state);
  return (
    <BgContainer showImage={false} white={false}>
      <ScrollView
        style={{flex: 1, margin: 15}}
        contentContainerStyle={{paddingTop: 10}}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[widgetStyles.headerTow, {textAlign: 'left'}]}>
          {I18n.t('aboutus')}
        </Text>
        <View
          style={[
            widgetStyles.panelContent,
            {
              flex: 1,
              padding: 20,
              marginLeft: 0,
              marginRight: 0,
              minHeight: 200,
            },
          ]}>
          <Text
            style={[
              widgetStyles.headerThree,
              {textAlign: 'left', lineHeight: 50},
            ]}>
            {settings.description}
          </Text>
        </View>
      </ScrollView>
    </BgContainer>
  );
};

export default DesigneratAboutusScreen;
