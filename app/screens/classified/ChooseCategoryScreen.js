import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../../constants';
import ChooseCategoryItem from '../../components/widgets/category/ChooseCategoryItem';

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
          <ChooseCategoryItem category={item} key={item.id} />
        )}></FlatList>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(ChooseCategoryScreen);

ChooseCategoryScreen.propTypes = {
  categories: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
});
