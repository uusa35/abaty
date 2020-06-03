import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import BgContainer from '../../components/containers/BgContainer';
import validate from 'validate.js';
const SubCategoryIndexScreen = ({
  homeUserCategories,
  category,
  commercials,
  show_commercials,
  dispatch,
  navigation,
}) => {
  useEffect(() => {
    if (validate.isEmpty(category)) {
      dispatch(navigation.navigate('Home'));
    }
  }, [category]);

  return (
    <BgContainer showImage={false}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          animation="bounceIn"
          easing="ease-out"
          style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
          <CategoriesList
            elements={category.children}
            // columns={2}
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
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
    homeUserCategories: state.homeUserCategories,
  };
}

export default connect(mapStateToProps)(SubCategoryIndexScreen);
