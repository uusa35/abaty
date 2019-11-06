import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';

const ParentCategoryIndexScreen = ({
  commercials,
  show_commercials,
  categories,
}) => {
  return (
    <View style={{flex: 1}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1}}>
        <CategoriesList elements={categories} columns={2} type="company" />
      </View>
      {show_commercials ? (
        <View style={{flex: 0.2}}>
          <CommercialSliderWidget commercials={commercials} />
        </View>
      ) : null}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(ParentCategoryIndexScreen);
