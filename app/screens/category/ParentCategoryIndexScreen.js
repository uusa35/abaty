import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import BgContainer from '../../components/containers/BgContainer';
import validate from 'validate.js';

const ParentCategoryIndexScreen = () => {
  const {commercials, settings, homeUserCategories} = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (validate.isEmpty(homeUserCategories)) {
      dispatch(navigation.navigate('Home'));
    }
  }, [homeUserCategories]);

  return (
    <BgContainer showImage={false}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          animation="bounceIn"
          easing="ease-out"
          style={{flex: settings.show_commercials ? 0.8 : 1}}>
          <CategoriesList
            elements={homeUserCategories}
            type="company"
            // columns={2}
            showBtn={true}
          />
        </View>
        {settings.show_commercials ? (
          <View style={{flex: 0.2}}>
            <CommercialSliderWidget commercials={commercials} />
          </View>
        ) : null}
      </View>
    </BgContainer>
  );
};

export default ParentCategoryIndexScreen;
