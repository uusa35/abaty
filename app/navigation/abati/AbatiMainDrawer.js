import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AbatiSideMenu from '../../components/drawers/AbatiSideMenu';
import AbatiHomeStack from './../abati/AbatiHomeStack';
const Drawer = createDrawerNavigator();

const AbatiMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <AbatiSideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={AbatiHomeStack} />
    </Drawer.Navigator>
  );
};

export default AbatiMainDrawer;
