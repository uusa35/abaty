import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IorderMainStack from './../iorder/IorderHomeStack';
import IorderSideMenu from '../../components/drawers/IorderSideMenu';

const Drawer = createDrawerNavigator();

const IorderMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <IorderSideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={IorderMainStack} />
    </Drawer.Navigator>
  );
};

export default IorderMainDrawer;
