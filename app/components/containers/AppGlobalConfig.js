import React, {Fragment, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import analytics from '@react-native-firebase/analytics';
import {APP_CASE} from '../../../app';
import moment from 'moment';
import {isEmpty} from 'lodash';

const AppGlobalConfig = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!isEmpty(navigation)) {
      const {routeName} = navigation.state;
      if (__DEV__) {
        // console.log('dev routeName', routeName);
      }
      analytics().logEvent(routeName, {
        item: `${APP_CASE}_${routeName}`,
        description: `${routeName}_${moment().format('YYYY-MM-DD')}`,
        start_date: moment().format('YYYY-MM-DD'),
      });
      analytics().setCurrentScreen(routeName);
    }
  }, []);

  return <Fragment></Fragment>;
};

export default AppGlobalConfig;
