import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IhouseSideMenu from '../../components/drawers/IhouseSideMenu';
import IhousesMainStack from './IhousesMainStack';

const Drawer = createDrawerNavigator();

const IhousesMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <IhouseSideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={IhousesMainStack} />
    </Drawer.Navigator>
  );
};

export default IhousesMainDrawer;
