import {createStackNavigator} from 'react-navigation-stack';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import MoreScreen from '../../screens/setting/MoreScreen';
import ContactusScreen from '../../screens/ContactusScreen';
import {isIOS} from '../../constants';

export const ContactStack = createStackNavigator(
  {
    MoreScreen: {
      screen: MoreScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => (
          <HeaderRight showCountry={false} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('more')} />,
        headerBackTitle: () => null,
      }),
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: () => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderMiddle title={I18n.t('contactus')} />,
        headerBackTitle: () => null,
      }),
      path: 'contactus',
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
  },
);

ContactStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
