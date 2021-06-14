import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IstoresMainStack from './IstoresHomeStack';
import IstoresSideMenu from '../../components/drawers/IstoresSideMenu';

const Drawer = createDrawerNavigator();

const IstoresMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <IstoresSideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={IstoresMainStack} />
    </Drawer.Navigator>
  );
};

export default IstoresMainDrawer;
