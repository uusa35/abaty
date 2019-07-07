import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../components/Lists/CategoriesList';
import {NavContext} from '../redux/NavContext';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';

class SubCategoryIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this props of nav', this.props.navigation.state.params);
    const {category, columns} = this.props.navigation.state.params;
    const {navigation, commercials} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavContext.Provider value={{navigation}}>
          <CategoriesList elements={category.children} columns={columns} />
          <CommercialSliderWidget commercials={commercials} />
        </NavContext.Provider>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    commercials: state.commercials
  };
}

export default connect(mapStateToProps)(SubCategoryIndexScreen);
