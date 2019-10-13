import {createDrawerNavigator} from 'react-navigation';
import SideMenu from '../../components/SideMenu';
import {isRTL} from '../../I18n';
import React from 'react';
import {AbatiBottomTabsStack} from './AbatiBottomNavigator';
import {MallrBottomTabsStack} from './BottomNavigator';

export const MallrDrawerNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: MallrBottomTabsStack
    }
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />,
    drawerPosition: isRTL ? 'right' : 'left',
    drawerBackgroundColor: 'white',
    overlayColor: 'transparent',
    contentOptions: {
      activeTintColor: 'black',
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);
