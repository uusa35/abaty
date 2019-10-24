import React, {useState, useMemo, useCallback, useEffect} from 'react';
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
import {width, text} from './../../constants';
import {map, first, shuffle, uniqBy, take} from 'lodash';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';

const ClassifiedFilterScreen = ({
  category,
  dispatch,
  searchModal,
  colors,
  categories
}) => {
  const [visible, setVisible] = useState(searchModal);
  const [price, setPrice] = useState(0);
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

  useMemo(() => {
    if (!visible) {
      dispatch({type: HIDE_SEARCH_MODAL});
    }
  }, [visible]);

  const showPropsModal = useCallback(g => {
    setPropsModalVisible(!propsModalVisible);
    setSelectedGroup(g);
  });

  useMemo(() => {
    if (!validate.isEmpty(selectedCategory)) {
      dispatch({type: SET_CATEGORY, payload: selectedCategory});
    } else {
      if (map(parentCategories, c => c.id === category.id)) {
        setSelectedCategory(category);
      } else {
        setSelectedCategory(parentCategories.map);
      }
    }
  }, [category, selectedCategory]);

  return (
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={visible}
        animationType={'slide'}
        onRequestClose={() => dispatch({type: HIDE_SEARCH_MODAL})}>
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
          <View style={{flex: 1}}>
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
                onPress={() => {
                  setVisible(false);
                  return goBack();
                }}
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
                borderColor: 'lightgrey'
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
                  sliderLength={width - 100}
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
                      borderColor: 'lightgrey'
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
                      <Image
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
          </View>
          <Modal
            transparent={false}
            animationType={first(shuffle(['slide', 'fade']))}
            presentationStyle="fullScreen"
            onRequestClose={() => console.log('close')}
            visible={propsModalVisible}>
            <View
              style={{
                width: '100%',
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
                <Image
                  source={{uri: selectedGroup.thumb}}
                  style={{width: 25, height: 25}}
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
                        onPress={() =>
                          setItems(
                            uniqBy(
                              items.concat({
                                group: selectedGroup,
                                property: p,
                                category_group_id: selectedGroup.id,
                                property_id: p.id
                              })
                            ),
                            'category_group_id'
                          )
                        }
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
        </ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: '2.5%'
          }}>
          <Button
            onPress={() => console.log('filter')}
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
    paddingLeft: 20,
    paddingRight: 20
  }
});
