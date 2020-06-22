import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {map} from 'lodash';
import {text} from '../../../constants/sizes';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useSelector} from 'react-redux';

const CategorySectionClassifiedFilterModal = ({
  parentCategories,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  handleParent,
}) => {
  const {colors} = useSelector((state) => state.settings);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'lightgrey',
        alignSelf: 'center',
      }}>
      {parentCategories ? (
        <View
          style={{
            width: '100%',
            marginBottom: 20,
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          {map(parentCategories, (c, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleParent(c)}
              style={[
                styles.btnStyle,
                {
                  borderColor:
                    selectedCategory && selectedCategory.id === c.id
                      ? colors.btn_bg_theme_color
                      : 'lightgrey',
                },
              ]}>
              <Text style={styles.btnTitle}>{c.name.substring(0, 50)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      {selectedCategory.children ? (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {map(selectedCategory.children, (sub, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedSubCategory(sub)}
              style={[
                styles.btnStyle,
                {
                  minWidth: 100,
                  borderColor:
                    selectedSubCategory && selectedSubCategory.id === sub.id
                      ? colors.btn_bg_theme_color
                      : 'lightgrey',
                },
              ]}>
              <Text style={styles.btnTitle}>{sub.name.substring(0, 50)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default React.memo(CategorySectionClassifiedFilterModal);

const styles = StyleSheet.create({
  btnStyle: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 5,
    minWidth: 65,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 3,
    marginLeft: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 1,
  },
  btnTitle: {
    fontSize: text.medium,
    fontFamily: text.font,
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 6,
  },
});
