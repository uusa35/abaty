import {createDrawerNavigator} from 'react-navigation-drawer';
import SideMenu from '../../components/SideMenu';
import {isRTL} from '../../I18n';
import React from 'react';
import {BottomTabsStack} from './BottomNavigator';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const DrawerNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: BottomTabsStack,
    },
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />,
    drawerPosition: isRTL ? 'right' : 'left',
    drawerBackgroundColor: 'white',
    overlayColor: 'transparent',
    contentOptions: {
      activeTintColor: 'black',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  },
);
