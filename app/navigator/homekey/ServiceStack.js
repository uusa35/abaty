import {createStackNavigator} from 'react-navigation';
import ServiceIndexAllScreen from '../../screens/ServiceIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import ServiceShowScreen from '../../screens/ServiceShowScreen';
import React from 'react';

export const ServiceStack = createStackNavigator(
  {
    ServiceIndexAll: {
      screen: ServiceIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
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
    headerMode: 'float',
  },
);
