import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {map, first, filter, shuffle, uniqBy} from 'lodash';
import {text} from './../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import ClassifiedStorePropertiesWidget from '../../components/widgets/property/ClassifiedStorePropertiesWidget';
import {addToProperties} from '../../redux/actions/classified';
import {HIDE_PROPERTIES_MODAL} from '../../redux/actions/types';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const CategoryGroupsScreen = ({navigation}) => {
  const {category, classifiedProps, propertiesModal} = useSelector(
    state => state,
  );
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const [currentCategoryGroup, setCurrentCategoryGroup] = useState(
    !validate.isEmpty(category) ? first(category.categoryGroups) : [],
  );
  const [categoryGroupVisible, setCategoryGroupVisible] = useState(false);
  [selectedProperties, setSelectedProperties] = useState([]);
  [remainingGroups, setRemainingGroups] = useState(category.categoryGroups);

  useMemo(() => {
    if (validate.isEmpty(remainingGroups)) {
      setCategoryGroupVisible(false);
    } else {
      setCategoryGroupVisible(true);
    }
  }, [currentCategoryGroup, remainingGroups]);

  const handleClick = useCallback(property => {
    const filterSwitchProps = filter(
      selectedProperties,
      p =>
        p.category_group_property ===
        `${currentCategoryGroup.id}${property.id}`,
    );
    if (!validate.isEmpty(filterSwitchProps)) {
      const removeProp = filter(
        selectedProperties,
        p => p.property.id !== property.id,
      );
      setSelectedProperties(removeProp);
    } else {
      const propsNow = [
        {
          cateogry_group: currentCategoryGroup,
          property: property,
          category_group_property: `${currentCategoryGroup.id}${property.id}`,
        },
        ...selectedProperties,
      ];
      const filteredProps = uniqBy(propsNow, 'category_group_property');
      if (!validate.isEmpty(filteredProps)) {
        setSelectedProperties(filteredProps);
        dispatch(
          addToProperties({
            category_group: currentCategoryGroup,
            property: property,
            category_group_property: `${currentCategoryGroup.id}${property.id}`,
          }),
        );
      }
      if (!currentCategoryGroup.is_multi) {
        goToNextGroup();
      }
    }
  });

  const goToNextGroup = useCallback(() => {
    const rest = filter(
      remainingGroups,
      (g, i) => g.id !== currentCategoryGroup.id,
    );
    if (!validate.isEmpty(rest)) {
      setCurrentCategoryGroup(first(rest));
      setRemainingGroups(rest);
    } else {
      setRemainingGroups([]);
    }
    setSelectedProperties([]);
  });

  const doneWithProperties = useCallback(() => {
    setCategoryGroupVisible(false);
    dispatch({type: HIDE_PROPERTIES_MODAL});
    if (category.is_real_estate) {
      dispatch(navigation.navigate('ChooseAddress'));
    } else {
      dispatch(navigation.navigate('ClassifiedStore'));
    }
  });

  useMemo(() => {
    if (validate.isEmpty(remainingGroups)) {
      setCategoryGroupVisible(false);
      // setCurrentGroupId(0);
      setCurrentCategoryGroup([]);
      doneWithProperties();
    }
  }, [selectedProperties]);

  return (
    <Fragment>
      {propertiesModal && (
        <View>
          {map(remainingGroups, (group, i) => {
            return (
              <Modal
                key={i}
                transparent={false}
                animationType={first(shuffle(['slide', 'fade']))}
                presentationStyle="fullScreen"
                onRequestClose={() => {
                  setCategoryGroupVisible(false);
                  return navigation.goBack();
                }}
                visible={
                  currentCategoryGroup.id === group.id && categoryGroupVisible
                }>
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    minHeight: 50,
                    marginTop: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    // paddingRight : 25, paddingLeft : 20 ,
                    // borderWidth : 10
                  }}>
                  <Icon
                    containerStyle={{position: 'absolute', left: 0}}
                    name="close"
                    type="evil-icons"
                    size={25}
                    style={{zIndex: 999}}
                    onPress={() => {
                      setCategoryGroupVisible(false);
                      return navigation.goBack();
                    }}
                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    {group.thumb ? (
                      <FastImage
                        source={{uri: group.thumb}}
                        style={{
                          width: 35,
                          height: 35,
                          marginRight: 3,
                          marginLeft: 3,
                        }}
                      />
                    ) : null}
                    {/*<Icon type="font-awesome" name={group.icon} />*/}
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: text.font,
                        fontSize: text.large,
                      }}>
                      {group.name}
                    </Text>
                  </View>
                  <Icon
                    containerStyle={{position: 'absolute', right: 0}}
                    name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                    type="entypo"
                    size={25}
                    style={{zIndex: 999}}
                    onPress={() => navigation.goBack()}
                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  />
                </View>
                <ScrollView
                  contentInset={{bottom: 150}}
                  contentContainerStyle={{
                    flex: 1,
                    paddingTop: 10,
                    width: '100%',
                    padding: '5%',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    {map(group.properties, (property, i) => {
                      return (
                        <TouchableOpacity
                          style={styles.propertiesWrapper}
                          onPress={() => handleClick(property)}
                          key={i}>
                          {!validate.isEmpty(property.thumb) ? (
                            <FastImage
                              source={{uri: property.thumb}}
                              style={{width: 30, height: 30}}
                              resizeMode="contain"
                            />
                          ) : (
                            <Icon type="font-awesome" name={property.icon} />
                          )}
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'baseline',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.title}>{property.name}</Text>
                            {currentCategoryGroup.is_multi ? (
                              !validate.isEmpty(
                                filter(
                                  selectedProperties,
                                  p => p.property.id === property.id,
                                ),
                              ) ? (
                                <Icon
                                  type="antdesign"
                                  name="checkcircleo"
                                  color="green"
                                />
                              ) : (
                                <Icon
                                  type="antdesign"
                                  name="minuscircleo"
                                  color="lightgrey"
                                />
                              )
                            ) : null}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View>
                    {currentCategoryGroup.is_multi ? (
                      <Button
                        onPress={() => goToNextGroup()}
                        raised
                        containerStyle={{
                          width: '100%',
                          marginBottom: 10,
                          marginTop: 10,
                        }}
                        buttonStyle={{
                          backgroundColor: colors.btn_bg_theme_color,
                        }}
                        title={I18n.t('skip_next')}
                        titleStyle={{
                          fontFamily: text.font,
                          color: colors.btn_text_theme_color,
                          fontSize: text.medium,
                        }}
                      />
                    ) : null}
                  </View>
                </ScrollView>
              </Modal>
            );
          })}
        </View>
      )}
      {!validate.isEmpty(classifiedProps) ? (
        <ClassifiedStorePropertiesWidget
          elements={classifiedProps}
          name={category.name}
        />
      ) : null}
    </Fragment>
  );
};

export default CategoryGroupsScreen;

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
    paddingLeft: 20,
    paddingRight: 20,
  },
});
