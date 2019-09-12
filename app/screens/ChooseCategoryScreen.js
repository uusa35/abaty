import React, {useCallback, Fragment} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Modal
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';
import FastImage from 'react-native-fast-image';
import {images, text} from '../constants';
import {Icon} from 'react-native-elements';
import {isRTL} from '../I18n';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from 'accordion-collapse-react-native';
import ChooseCategoryItem from '../components/widgets/category/ChooseCategoryItem';

const ChooseCategoryScreen = ({categories, dispatch}) => {
  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={categories}
        renderItem={({item}) => (
          <ChooseCategoryItem
            category={item}
            dispatch={dispatch}
            key={item.id}
          />
        )}></FlatList>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps)(ChooseCategoryScreen);

ChooseCategoryScreen.propTypes = {
  categories: PropTypes.array.isRequired
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 15,
    height: 50
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left'
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15
  }
});
