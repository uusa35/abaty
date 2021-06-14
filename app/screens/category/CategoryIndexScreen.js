import React from 'react';
import {useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import BgContainer from '../../components/containers/BgContainer';

const CategoryIndexScreen = () => {
  const {homeCategories, commercials, show_commercials} = useSelector(
    state => state,
  );

  return (
    <BgContainer showImage={false}>
      <View style={{flex: 1}}>
        <View
          useNativeDriver={true}
          animation="bounceIn"
          easing="ease-out"
          style={{
            flex: show_commercials ? 0.8 : 1,
            backgroundColor: 'white',
            marginTop: '5%',
          }}>
          <CategoriesList
            elements={homeCategories}
            columns={1}
            showBtn={false}
            showName={true}
            type={'product'}
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
