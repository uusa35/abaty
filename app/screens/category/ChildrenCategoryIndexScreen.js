import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import validate from 'validate.js';

const ChildrenCategoryIndexScreen = ({navigation}) => {
  const {commercials, settings, subCategory} = useSelector(state => state);
  const {show_commercials} = settings;
  const dispatch = useDispatch();

  useEffect(() => {
    if (validate.isEmpty(subCategory)) {
      dispatch(navigation.navigate('Home'));
    }
  }, [subCategory]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
        <CategoriesList
          elements={subCategory.children}
          columns={2}
          type="company"
          showBtn={true}
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

export default ChildrenCategoryIndexScreen;
