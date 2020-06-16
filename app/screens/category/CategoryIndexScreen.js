import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {ABATI, MALLR, EXPO} from './../../../app';
import BgContainer from '../../components/containers/BgContainer';

const CategoryIndexScreen = () => {
  const {homeCategories, commercials, show_commercials} = useSelector(
    (state) => state,
  );

  useEffect(() => {}, [homeCategories]);

  return (
    <BgContainer showImage={false}>
      <View style={{flex: 1}}>
        <View
          animation="bounceIn"
          easing="ease-out"
          style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
          <CategoriesList
            elements={homeCategories}
            columns={2}
            showBtn={true}
            type={ABATI || MALLR || EXPO ? 'product' : 'classified'}
          />
        </View>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            <CommercialSliderWidget commercials={commercials} />
          </View>
        ) : null}
      </View>
    </BgContainer>
  );
};

export default CategoryIndexScreen;
