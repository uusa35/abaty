import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ServiceIndexAllScreen from '../../screens/service/ServiceIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import ServiceShowScreen from '../../screens/service/ServiceShowScreen';

export const ServiceStack = createStackNavigator(
  {
    ServiceIndexAll: {
      screen: ServiceIndexAllScreen,
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null,
      }),
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null,
        headerStyle: {
          // backgroundColor: 'white',
          // zIndex: 100
        },
      }),
      path: `service/:id`,
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false,
  },
);

ServiceStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
