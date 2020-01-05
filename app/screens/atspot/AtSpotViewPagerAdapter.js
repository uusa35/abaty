import React, {useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';

export const AtSpotViewPagerAdapter = () => {
  return (
    <TabView
      renderScene={() => {
        /* render */
      }}
      renderTabBar={() => null}
      renderPager={props => (
        <ViewPagerAdapter {...props} transition="curl" showPageIndicator />
      )}
    />
  );
};

export default AtSpotViewPagerAdapter;
