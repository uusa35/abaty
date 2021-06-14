import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyExpoSideMenu from '../../components/drawers/MyExpoSideMenu';
import MyExpoHomeStack from './../myexpo/MyExpoHomeStack';

const Drawer = createDrawerNavigator();

const MyExpoMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <MyExpoSideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={MyExpoHomeStack} />
    </Drawer.Navigator>
  );
};

export default MyExpoMainDrawer;
