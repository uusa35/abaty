import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Fragment
} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon, ButtonGroup} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {useNavigation} from 'react-navigation-hooks';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {SafeAreaView} from 'react-navigation';
import {HIDE_SEARCH_MODAL, SET_CATEGORY} from '../../redux/actions/types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {width, height, text} from './../../constants';
import {map, first, shuffle, uniqBy, take, remove, filter} from 'lodash';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../redux/actions';

const ClassifiedFilterScreen = ({
  category,
  dispatch,
  searchModal,
  colors,
  categories
}) => {
  const [searchModalVisible, setSearchModalVisible] = useState(searchModal);
  const [price, setPrice] = useState();
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [propsModalVisible, setPropsModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const {goBack} = useNavigation();
  const [parentCategories, setParentCategories] = useState([]);

  useMemo(() => {
    if (validate.isEmpty(parentCategories)) {
      const parents = take(map(categories, c => (c.isParent ? c : null)), 3);
      setParentCategories(parents);
    }
  }, [parentCategories]);

  const showPropsModal = useCallback(g => {
    setPropsModalVisible(!propsModalVisible);
    setSelectedGroup(g);
    const currentItems = filter(items, i => i.category_group_id !== g.id);
    setItems(currentItems);
  });

  useMemo(() => {
    if (!validate.isEmpty(selectedCategory)) {
      dispatch({type: SET_CATEGORY, payload: selectedCategory});
    } else {
      if (map(parentCategories, c => c.id === category.id)) {
        setSelectedCategory(category);
      }
    }
    setItems([]);
  }, [category, selectedCategory]);

  const handleSetItems = useCallback(p => {
    setPropsModalVisible(false);
    const currentItems = items.concat({
      category_group: selectedGroup,
      property: p,
      category_group_id: selectedGroup.id,
      property_id: p.id,
      property_value: p.value,
      id: selectedGroup.id + '-' + p.id
    });
    setItems(currentItems);
  });

  const handleShowSearchModal = useCallback(() => {
    setSearchModalVisible(false);
    setPropsModalVisible(false);
    dispatch({type: HIDE_SEARCH_MODAL});
    dispatch(goBack());
  });

  useEffect(() => {
    if (!searchModal) {
      setSearchModalVisible(searchModal);
      setPropsModalVisible(searchModal);
      dispatch(goBack());
    }
  }, [searchModal]);

  const handleSubmitFilter = useCallback(() => {
    dispatch(
      getSearchClassifieds({
        searchParams: {
          search,
          classified_category_id: selectedCategory.id,
          items,
          price
        },
        redirect: true,
        name: selectedCategory
          ? selectedCategory.name
          : I18n.t('search_results')
      })
    );
  });

  return (
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={searchModalVisible}
        animationType={'slide'}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            marginTop: 40,
            flexDirection: 'row',
            width: '100%',
            padding: 10
          }}>
          <View
            style={{
              flex: 1,
              minHeight: height - 100,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline'
              }}>
              <Icon
                name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                type="entypo"
                size={25}
                containerStyle={{padding: 0, margin: 0}}
                style={{zIndex: 999}}
                onPress={() => handleShowSearchModal()}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              />
              <ClassifiedSearchForm />
            </View>
            {parentCategories ? (
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  marginTop: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }}>
                {map(parentCategories, (c, i) => (
                  <Button
                    key={i}
                    onPress={() => setSelectedCategory(c)}
                    raised
                    containerStyle={{width: '32%', alignSelf: 'center'}}
                    buttonStyle={{
                      backgroundColor: colors.btn_bg_theme_color,
                      opacity:
                        selectedCategory && selectedCategory.id === c.id
                          ? 1
                          : 0.6,
                      height: 40
                    }}
                    title={c.name.substring(0, 20)}
                    titleStyle={{
                      fontFamily: text.font,
                      color: colors.btn_text_theme_color
                    }}
                  />
                ))}
              </View>
            ) : null}

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
                alignSelf: 'center'
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.main_theme_color
                }}>
                {I18n.t('choose_price_range')}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 10,
                  width: '100%'
                }}>
                <MultiSlider
                  allowOverlap
                  snapped
                  min={100}
                  max={1000}
                  step={10}
                  values={priceRange}
                  sliderLength={width - 90}
                  onValuesChangeStart={() => console.log('started')}
                  onValuesChange={e => setPriceRange(e)}
                  onValuesChangeFinish={() => console.log('end')}
                  style={{alignSelf: 'center'}}
                  selectedStyle={{
                    backgroundColor: colors.btn_bg_theme_color
                  }}
                  unselectedStyle={{
                    backgroundColor: 'silver'
                  }}
                  containerStyle={{
                    height: 40
                  }}
                  trackStyle={{
                    height: 10,
                    backgroundColor: 'red'
                  }}
                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.main_theme_color
                }}>
                {I18n.t('price')} : {priceRange[0]} - {priceRange[1]}
              </Text>
            </View>
            {!validate.isEmpty(category) ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingTop: 15
                }}>
                {map(category.categoryGroups, (g, i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderTopWidth: 0.5,
                      // borderBottomWidth: 0.5,
                      borderColor: 'lightgrey',
                      maxHeight: 60
                    }}>
                    <TouchableOpacity
                      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                      onPress={() => showPropsModal(g)}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: 10
                      }}>
                      <FastImage
                        source={{uri: g.thumb}}
                        style={{
                          width: 50,
                          height: 50,
                          marginLeft: 10,
                          marginRight: 10,
                          borderRadius: 5
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: text.font,
                          fontSize: text.medium,
                          color: colors.main_theme_color
                        }}>
                        {g.name}
                      </Text>
                      <Button
                        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                        onPress={() => showPropsModal(g)}
                        raised
                        containerStyle={{width: 80, alignSelf: 'center'}}
                        buttonStyle={{
                          backgroundColor: colors.btn_bg_theme_color
                        }}
                        icon={
                          <Icon
                            name={
                              !isRTL
                                ? 'chevron-thin-right'
                                : 'chevron-thin-left'
                            }
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
                borderColor: 'lightgrey'
              }}>
              <Text style={[styles.title, {textAlign: 'center', margin: 15}]}>
                {I18n.t('search_parameters_selected')}
              </Text>
              <View>
                {selectedCategory ? (
                  <View>
                    <Text style={styles.title}>
                      {I18n.t('category_selected')} {category.name}
                    </Text>
                    <Text style={styles.title}>
                      {I18n.t('properties_selected')}
                    </Text>
                  </View>
                ) : null}
                {price ? (
                  <View>
                    <Text style={styles.title}>{I18n.t('price')}</Text>
                    <Text style={styles.title}>{price}</Text>
                  </View>
                ) : null}
              </View>
              {!validate.isEmpty(items) ? (
                <Fragment>
                  {map(items, (item, i) => (
                    <View key={i} style={{flexDirection: 'row'}}>
                      <Text style={styles.subTitle}>
                        {item.category_group.name}
                      </Text>
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
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginBottom: '2.5%'
              }}>
              <Button
                onPress={() => setItems([])}
                raised
                containerStyle={{
                  width: '95%',
                  alignSelf: 'center',
                  marginBottom: 10,
                  marginTop: 10
                }}
                buttonStyle={{backgroundColor: 'red'}}
                title={I18n.t('remove_filter')}
                titleStyle={{
                  fontFamily: text.font,
                  color: colors.btn_text_theme_color
                }}
              />
              <Button
                onPress={() => handleSubmitFilter()}
                raised
                containerStyle={{width: '95%', alignSelf: 'center'}}
                buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
                title={I18n.t('apply_filter')}
                titleStyle={{
                  fontFamily: text.font,
                  color: colors.btn_text_theme_color
                }}
              />
            </View>
          </View>
        </ScrollView>
        <Modal
          transparent={false}
          animationType={first(shuffle(['slide', 'fade']))}
          presentationStyle="fullScreen"
          onRequestClose={() => console.log('close')}
          visible={propsModalVisible}>
          <View
            style={{
              width: '95%',
              minHeight: 50,
              justifyContent: 'center',
              marginTop: '10%',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row-reverse'
            }}>
            <Icon
              containerStyle={{position: 'absolute', left: 0}}
              name="close"
              type="evil-icons"
              size={25}
              style={{zIndex: 999}}
              onPress={() => setPropsModalVisible(false)}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                width: 120,
                justifyContent: 'space-between'
              }}>
              <FastImage
                source={{uri: selectedGroup.thumb}}
                style={{width: 30, height: 30}}
              />
              {/*<Icon type="font-awesome" name={selectedGroup.icon} />*/}
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: text.font,
                  fontSize: text.large
                }}>
                {selectedGroup.name}
              </Text>
            </View>
            <Icon
              containerStyle={{position: 'absolute', right: 0}}
              name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
              type="entypo"
              size={25}
              style={{zIndex: 999}}
              onPress={() => setPropsModalVisible(false)}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
          </View>
          <ScrollView
            contentContainerStyle={{
              flex: 0.9,
              paddingTop: 10,
              width: '100%'
            }}>
            {!validate.isEmpty(selectedGroup) ? (
              <View>
                {map(selectedGroup.properties, (p, i) => {
                  return (
                    <TouchableOpacity
                      style={styles.propertiesWrapper}
                      onPress={() => handleSetItems(p)}
                      key={i}>
                      {p.thumb ? (
                        <FastImage
                          source={{uri: p.thumb}}
                          style={{width: 30, height: 30}}
                          resizeMode="contain"
                        />
                      ) : (
                        <Icon type="font-awesome" name={p.icon} />
                      )}
                      <Text style={styles.title}>{p.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
        </Modal>
      </Modal>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    categories: state.categories,
    searchModal: state.searchModal,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ClassifiedFilterScreen);

const styles = StyleSheet.create({
  iconModalWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    borderWidth: 4,
    borderColor: 'green',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 999
  },
  propertiesWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    padding: 10
  },
  title: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.small,
    padding: 5,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20
  }
});
