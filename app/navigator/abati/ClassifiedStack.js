import {createStackNavigator} from 'react-navigation-stack';
import HomeKeyScreen from '../../screens/HomeKeyScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import ClassifiedIndexScreen from '../../screens/ClassifiedIndexScreen';
import ClassifiedShowScreen from '../../screens/ClassifiedShowScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import React from 'react';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';

export const ClassifiedStack = createStackNavigator(
  {
    HomeKey: {
      screen: HomeKeyScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight showFilter={true} showCountry={true} />,
        headerBackTitle: null,
      }),
    },
    Classified: {
      screen: NormalClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            showCountry={true}
          />
        ),
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: 'white',
          borderColor: 'transparent',
          zIndex: 100,
        },
      }),
      path: `classified/:id`,
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
  },
);
