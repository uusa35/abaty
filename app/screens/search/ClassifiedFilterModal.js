import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Fragment,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {HIDE_SEARCH_MODAL} from '../../redux/actions/types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {isIOS} from './../../constants';
import {width, text} from './../../constants/sizes';
import {map, first, take, filter} from 'lodash';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../redux/actions/classified';
import {setCategory, setSubCategory} from '../../redux/actions/category';
import ModalBackContainer from '../../components/containers/ModalBackContainer';
import {hideClassifiedFilter} from '../../redux/actions';
import {HOMEKEY} from './../../../app';
import CategorySectionClassifiedFilterModal from '../../components/widgets/search/CategorySectionClassifiedFilterModal';

const ClassifiedFilterModal = ({
  category,
  subCategory,
  dispatch,
  searchModal,
  colors,
  categories,
  country,
  area,
  classifiedFilterModal,
}) => {
  const [searchModalVisible, setSearchModalVisible] = useState(searchModal);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [priceRange, setPriceRange] = useState([0, HOMEKEY ? 10000 : 1000]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
  const [propsModalVisible, setPropsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [props, setProps] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [currentArea, setCurrentArea] = useState(area);

  useEffect(() => {
    if (validate.isEmpty(parentCategories)) {
      const parents = take(
        map(categories, (c) => (c.isParent ? c : null)),
        3,
      );
      setParentCategories(parents);
    }
  }, [categories]);

  const showPropsModal = useCallback((g) => {
    setPropsModalVisible(!propsModalVisible);
    setSelectedGroup(g);
    const currentItems = filter(items, (i) => i.category_group_id !== g.id);
    setItems(currentItems);
  });

  useMemo(() => {
    setPrice(priceRange[0]);
    setMin(priceRange[0]);
    setMax(priceRange[1]);
  }, [priceRange]);

  useMemo(() => {
    if (classifiedFilterModal) {
      if (!validate.isEmpty(selectedCategory)) {
        dispatch(setCategory(selectedCategory));
        if (!validate.isEmpty(selectedCategory.children)) {
          setSubCategory(first(selectedCategory.children));
          dispatch(setSubCategory(first(selectedCategory.children)));
        }
      } else {
        if (map(parentCategories, (c) => c.id === category.id)) {
          setSelectedCategory(category);
          if (!validate.isEmpty(category.children)) {
            setSubCategory(first(category.children));
            dispatch(setSubCategory(first(category.children)));
          }
        }
      }
    }
    setItems([]);
  }, [category, selectedCategory]);

  const handleSetItems = useCallback((p) => {
    setPropsModalVisible(false);
    const currentItems = items.concat({
      category_group: selectedGroup,
      property: p,
      category_group_id: selectedGroup.id,
      property_id: p.id,
      property_value: p.value,
    });
    const currentProps = map(currentItems, (item, i) => {
      return {
        category_group_id: selectedGroup.id,
        property_id: p.id,
        value: p.value,
      };
    });
    setProps(currentProps);
    setItems(currentItems);
  });

  const handleShowSearchModal = useCallback(() => {
    setSearchModalVisible(false);
    setPropsModalVisible(false);
    dispatch({type: HIDE_SEARCH_MODAL});
  });

  useEffect(() => {
    if (!searchModal) {
      setSearchModalVisible(searchModal);
      setPropsModalVisible(searchModal);
    }
  }, [searchModal]);

  const handleSubmitFilter = useCallback(() => {
    return dispatch(
      getSearchClassifieds({
        searchParams: {
          search,
          classified_category_id: selectedSubCategory
            ? selectedSubCategory.id
            : selectedCategory.id,
          props,
          min,
          max,
          country_id: country.id,
          // area_id: currentArea.id,
        },
        redirect: true,
        name: selectedCategory
          ? selectedCategory.name
          : I18n.t('search_results'),
      }),
    );
  });

  const handleClearFilter = useCallback(() => {
    setItems([]);
    setProps([]);
    setCurrentArea({});
  });

  useMemo(() => {
    setCurrentArea(area);
  }, [area]);

  const handleParent = useCallback((p) => {
    setSelectedCategory(p);
    // if(p.max - p.min > 500) {
    //   setMin(p.min);
    //   setMax(p.max);
    //   setPriceRange([p.min, p.max]);
    // }
    if (!validate.isEmpty(p.children) && p.has_children) {
      setSelectedSubCategory(first(p.children));
    }
  });

  useMemo(() => {
    dispatch(setSubCategory(selectedSubCategory));
  }, [selectedSubCategory]);

  const handleHideModal = useCallback(() => {
    dispatch(hideClassifiedFilter());
  });
  return (
    <ModalBackContainer
      toggleVisible={classifiedFilterModal}
      setToggleVisible={handleHideModal}
      title={I18n.t('classified_filter')}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          backgroundColor: 'white',
        }}>
        <ClassifiedSearchForm search={search} setSearch={setSearch} />
      </View>

      <CategorySectionClassifiedFilterModal
        parentCategories={parentCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        handleParent={handleParent}
        colors={colors}
      />
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
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            color: colors.main_theme_color,
          }}>
          {I18n.t('choose_price_range')}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            width: '100%',
          }}>
          <MultiSlider
            allowOverlap
            snapped
            min={min}
            max={max}
            step={10}
            values={priceRange}
            sliderLength={width - 90}
            // onValuesChangeStart={() => console.log('started')}
            onValuesChange={(e) => setPriceRange(e)}
            // onValuesChangeFinish={() => console.log('end')}
            style={{alignSelf: 'center'}}
            selectedStyle={{
              backgroundColor: colors.btn_bg_theme_color,
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
            containerStyle={{
              height: 40,
            }}
            trackStyle={{
              height: isIOS ? 10 : 2,
              backgroundColor: 'green',
            }}
            touchDimensions={{
              height: 40,
              width: 40,
              borderRadius: 20,
              slipDisplacement: 40,
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            color: colors.main_theme_color,
          }}>
          {I18n.t('price')} : {priceRange[0]} - {priceRange[1]}
        </Text>
      </View>
      {!validate.isEmpty(category) ? (
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 15,
          }}>
          {map(category.categoryGroups, (g, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: 'lightgrey',
              }}>
              <TouchableOpacity
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                onPress={() => showPropsModal(g)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <FastImage
                  source={{uri: g.thumb}}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                />
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.medium,
                    color: colors.main_theme_color,
                  }}>
                  {g.name}
                </Text>
                <Button
                  hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  onPress={() => showPropsModal(g)}
                  raised
                  containerStyle={{width: 80, alignSelf: 'center'}}
                  buttonStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                  }}
                  icon={
                    <Icon
                      name={!isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                      type="entypo"
                      size={15}
                      color="white"
                    />
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}
      <View
        style={{
          margin: 10,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'lightgrey',
          width: '100%',
        }}>
        <Text style={[styles.title, {textAlign: 'center', margin: 5}]}>
          {I18n.t('search_parameters_selected')}
        </Text>
        <View>
          {selectedCategory ? (
            <View>
              <Text style={styles.title}>
                {I18n.t('category_selected')}{' '}
                {selectedSubCategory
                  ? selectedSubCategory.name
                  : selectedCategory.name}
              </Text>
              <Text style={styles.title}>{I18n.t('properties_selected')}</Text>
            </View>
          ) : null}
          {price ? (
            <View>
              <Text style={styles.title}>
                {I18n.t('price')} : {price}
              </Text>
            </View>
          ) : null}
          {country ? (
            <View>
              <Text style={styles.title}>
                {I18n.t('country')} : {country.slug}
              </Text>
            </View>
          ) : null}
          {currentArea ? (
            <View>
              <Text style={styles.title}>
                {I18n.t('area')} : {currentArea.slug}
              </Text>
            </View>
          ) : null}
        </View>
        {!validate.isEmpty(items) ? (
          <Fragment>
            {map(items, (item, i) => (
              <View key={i} style={{flexDirection: 'row'}}>
                <Text style={styles.subTitle}>{item.category_group.name}</Text>
                <Text style={styles.subTitle}>
                  {item.property.name} {item.property.value}
                </Text>
              </View>
            ))}
          </Fragment>
        ) : null}
      </View>
      <View
        style={{
          position: 'relative',
          bottom: 0,
          width: '100%',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <Button
          onPress={() => handleSubmitFilter()}
          raised
          containerStyle={{width: '95%', alignSelf: 'center'}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('apply_filter')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
        <Button
          onPress={() => handleClearFilter()}
          raised
          containerStyle={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}
          buttonStyle={{backgroundColor: 'red'}}
          title={I18n.t('remove_filter')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      </View>
    </ModalBackContainer>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    subCategory: state.subCategory,
    categories: state.categories,
    searchModal: state.searchModal,
    colors: state.settings.colors,
    country: state.country,
    area: state.area,
    classifiedFilterModal: state.classifiedFilterModal,
  };
}

export default connect(mapStateToProps)(ClassifiedFilterModal);

const styles = StyleSheet.create({
  iconModalWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    borderWidth: 4,
    borderColor: 'green',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 999,
  },
  propertiesWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    padding: 10,
  },
  title: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.small,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20,
  },
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
