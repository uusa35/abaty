import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import BgContainer from '../../components/containers/BgContainer';
import validate from 'validate.js';

const ParentCategoryIndexScreen = ({
  commercials,
  show_commercials,
  homeUserCategories,
  dispatch,
  navigation,
}) => {
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
          style={{flex: show_commercials ? 0.8 : 1}}>
          <CategoriesList
            elements={homeUserCategories}
            type="company"
            // columns={2}
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
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
    homeUserCategories: state.homeUserCategories,
  };
}

export default connect(mapStateToProps)(ParentCategoryIndexScreen);
