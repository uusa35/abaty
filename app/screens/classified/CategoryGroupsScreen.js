import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {map, first, filter, shuffle} from 'lodash';
import {text} from './../../constants';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import ClassifiedStorePropertiesWidget from '../../components/widgets/property/ClassifiedStorePropertiesWidget';
import {addToProperties} from '../../redux/actions';
import {SHOW_PROPERTIES_MODAL} from '../../redux/actions/types';

const CategoryGroupsScreen = ({
  category,
  dispatch,
  classifiedProps,
  propertiesModal,
  navigation
}) => {
  const [currentCategoryGroup, setCurrentCategoryGroup] = useState(
    !validate.isEmpty(category) ? first(category.categoryGroups) : null
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
    setSelectedProperties([
      {
        cateogry_group: currentCategoryGroup,
        property: property,
        category_group_property: property.id + currentCategoryGroup.id
        // value: property.value,
        // name: property.name,
        // icon: property.icon,
        // thumb: property.thumb
      },
      ...selectedProperties
    ]);
    dispatch(
      addToProperties({
        cateogry_group: currentCategoryGroup,
        property: property,
        category_group_property: property.id + currentCategoryGroup.id
      })
    );
    const rest = filter(
      remainingGroups,
      (g, i) => g.id !== currentCategoryGroup.id
    );
    console.log('the rest', rest);
    console.log('ramingGroups', remainingGroups);
    if (!validate.isEmpty(rest)) {
      setCurrentCategoryGroup(first(rest));
      setRemainingGroups(rest);
    } else {
      setRemainingGroups(null);
    }
  });

  const doneWithProperties = useCallback(() => {
    setCategoryGroupVisible(false);
    dispatch({type: SHOW_PROPERTIES_MODAL});
    dispatch(navigation.navigate('ClassifiedStore'));
  });

  useMemo(() => {
    if (validate.isEmpty(remainingGroups)) {
      setCategoryGroupVisible(false);
      // setCurrentGroupId(0);
      setCurrentCategoryGroup([]);
      doneWithProperties();
    }
  }, [selectedProperties]);

  console.log('remainingGroups', remainingGroups);
  return (
    <Fragment>
      {propertiesModal ? (
        <Fragment>
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
                    onPress={() => {
                      setCategoryGroupVisible(false);
                      return navigation.goBack();
                    }}
                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      width: 120,
                      justifyContent: 'space-between'
                    }}>
                    <Icon type="font-awesome" name={group.icon} />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: text.font,
                        fontSize: text.large
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
                  contentContainerStyle={{
                    flex: 0.9,
                    paddingTop: 10,
                    width: '100%'
                  }}>
                  <View>
                    {map(group.properties, (property, i) => {
                      return (
                        <TouchableOpacity
                          style={styles.propertiesWrapper}
                          onPress={() => handleClick(property)}
                          key={i}>
                          {property.icon ? (
                            <Icon type="font-awesome" name={property.icon} />
                          ) : (
                            <FastImage
                              source={{uri: property.thumb}}
                              style={{width: 30, height: 30}}
                            />
                          )}
                          <Text style={styles.title}>{property.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </Modal>
            );
          })}
        </Fragment>
      ) : null}
      {!validate.isEmpty(classifiedProps) ? (
        <ClassifiedStorePropertiesWidget
          elements={classifiedProps}
          name={category.name}
        />
      ) : null}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    classifiedProps: state.classifiedProps,
    propertiesModal: state.propertiesModal
  };
}

export default connect(mapStateToProps)(CategoryGroupsScreen);

CategoryGroupsScreen.propTypes = {
  category: PropTypes.object.isRequired
};
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
    alignItems: 'baseline',
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
