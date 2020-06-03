import {createStackNavigator} from 'react-navigation';
import ServiceIndexAllScreen from '../../screens/service/ServiceIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import ServiceShowScreen from '../../screens/service/ServiceShowScreen';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';

export const ServiceStack = createStackNavigator(
  {
    ServiceIndexAll: {
      screen: gestureHandlerRootHOC(ServiceIndexAllScreen),
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: () => null,
      }),
    },
    Service: {
      screen: gestureHandlerRootHOC(ServiceShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight displayShare={true} display={true} />,
        headerBackTitle: () => null,
        headerStyle: {
          // backgroundColor: 'white',
          // zIndex: 100
        },
      }),
      path: `service/:id`,
    },
    ImageZoom: {
      screen: gestureHandlerRootHOC(ImageZoomWidget),
      navigationOptions: ({navigation}) => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'float',
  },
);
