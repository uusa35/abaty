import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';

const SubCategoryIndexScreen = ({category, navigation, commercials}) => {
  const {columns} = navigation.state.params;
  return (
    <View style={{flex: 1}}>
      <CategoriesList elements={category.children} columns={columns} />
      <CommercialSliderWidget commercials={commercials} />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    commercials: state.commercials,
  };
}

export default connect(mapStateToProps)(SubCategoryIndexScreen);
