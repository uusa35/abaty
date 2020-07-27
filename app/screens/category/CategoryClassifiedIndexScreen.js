import React from 'react';
import {connect, useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {HOMEKEY, ABATI, MALLR, ESCRAP} from './../../../app';

const CategoryClassifiedIndexScreen = () => {
  const {homeClassifiedCategories, commercials, settings} = useSelector(
    (state) => state,
  );
  const {show_commercials} = settings;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        useNativeDriver={true}
        style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
        <CategoriesList
          elements={homeClassifiedCategories}
          columns={2}
          showBtn={true}
          type="classified"
        />
      </View>
      {show_commercials ? (
        <View style={{flex: 0.2}}>
          <CommercialSliderWidget commercials={commercials} />
        </View>
      ) : null}
    </View>
  );
};

export default CategoryClassifiedIndexScreen;
