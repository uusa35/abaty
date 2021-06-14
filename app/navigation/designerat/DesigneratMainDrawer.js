import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DesigneratSideMenu from '../../components/drawers/DesigneratSideMenu';
import DesigneratHomeStack from './../designerat/DesigneratHomeStack';
const Drawer = createDrawerNavigator();

const DesigneratMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <DesigneratSideMenu {...props} showLogo={true} />
      )}>
      <Drawer.Screen name="HomeStack" component={DesigneratHomeStack} />
    </Drawer.Navigator>
  );
};

export default DesigneratMainDrawer;
