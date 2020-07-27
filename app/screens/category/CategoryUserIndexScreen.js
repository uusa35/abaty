import React from 'react';
import {useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';

const CategoryUserIndexScreen = () => {
  const {homeUserCategories, commercials, settings} = useSelector(
    (state) => state,
  );
  const {show_commercials} = settings;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
        <CategoriesList
          elements={homeUserCategories}
          columns={2}
          showBtn={true}
          type="company"
        />
      </View>
      {show_commercials && (
        <View style={{flex: 0.2}}>
          <CommercialSliderWidget commercials={commercials} />
        </View>
      )}
    </View>
  );
};

export default CategoryUserIndexScreen;

CategoryUserIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
