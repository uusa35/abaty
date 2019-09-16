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
import {map, first, filter} from 'lodash';
import {text} from './../constants';
import {Icon} from 'react-native-elements';
import {isRTL} from '../I18n';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import ClassifiedStorePropertiesWidget from '../components/widgets/property/ClassifiedStorePropertiesWidget';
import {addToProperties} from '../redux/actions';

const CategoryGroupsScreen = ({
  category,
  dispatch,
  classifiedProps,
  propertiesModal,
  navigation
}) => {
  [currentGroupId, setCurrentGroupId] = useState(
    !validate.isEmpty(category) ? first(category.categoryGroups).id : null
  );
  const [categoryGroupVisible, setCategoryGroupVisible] = useState(false);
  [selectedProperties, setSelectedProperties] = useState([]);
  [remainingGroups, setRemainingGroups] = useState(category.categoryGroups);

  useMemo(() => {
    if (validate.isEmpty(remainingGroups)) {
      setCategoryGroupVisible(false);
    } else {
      setCategoryGroupVisible(!categoryGroupVisible);
    }
  }, [currentGroupId, remainingGroups]);

  const handleClick = useCallback(property => {
    setSelectedProperties([
      {
        property_id: property.id,
        value: property.value,
        name: property.name,
        icon: property.icon,
        thumb: property.thumb
      },
      ...selectedProperties
    ]);
    dispatch(
      addToProperties({
        property_id: property.id,
        value: property.value,
        name: property.name,
        icon: property.icon,
        thumb: property.thumb
      })
    );
    const rest = filter(remainingGroups, (g, i) => g.id !== currentGroupId);
    if (!validate.isEmpty(rest)) {
      setCurrentRaminingId(first(rest).id);
      setRemainingGroups(rest);
    } else {
      setRemainingGroups(null);
    }
  });

  const doneWithProperties = useCallback(() => {
    setCategoryGroupVisible(false);
    dispatch(navigation.navigate('ClassifiedStore'));
  });

  useMemo(() => {
    if (validate.isEmpty(remainingGroups)) {
      setCategoryGroupVisible(false);
      setCurrentGroupId(0);
      doneWithProperties();
    }
  }, [selectedProperties]);

  return (
    <Fragment>
      {propertiesModal ? (
        <Fragment>
          {map(remainingGroups, (group, i) => {
            return (
              <Modal
                key={i}
                transparent={false}
                animationType={'slide'}
                onRequestClose={() => setCategoryGroupVisible(false)}
                visible={currentGroupId === group.id && categoryGroupVisible}>
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
                    // onPress={() => navigation.goBack()}
                    onPress={() => setCategoryGroupVisible(false)}
                    hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: text.font,
                      fontSize: text.large
                    }}>
                    {group.name}
                  </Text>
                  <Icon
                    containerStyle={{position: 'absolute', right: 0}}
                    name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                    type="entypo"
                    size={25}
                    style={{zIndex: 999}}
                    onPress={() => navigation.goBack()}
                    // onPress={() => setCategoryGroupVisible(false)}
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

export default connect(mapStateToProps)(React.memo(CategoryGroupsScreen));

CategoryGroupsScreen.propTypes = {
  category: PropTypes.object.isRequired
};
const styles = StyleSheet.create({
  iconModalWrapper: {
    // flex : 0.1,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingBottom: 5,
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
