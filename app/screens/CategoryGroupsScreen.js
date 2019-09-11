import React, {Fragment, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {map, first, filter} from 'lodash';
import {width, height, text} from './../constants';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import FastImage from 'react-native-fast-image';
import {setProperties} from '../redux/actions';
import validate from 'validate.js';
import ClassifiedStorePropertiesWidget from '../components/widgets/property/ClassifiedStorePropertiesWidget';

const CategoryGroupsScreen = ({category, navigation, dispatch, properties}) => {
  [currentGroupId, setCurrentGroupId] = useState(
    first(category.categoryGroups).id
  );
  [selectedProperties, setSelectedProperties] = useState([]);
  [remainingGroups, setRemainingGroups] = useState(category.categoryGroups);

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
    const rest = filter(remainingGroups, (g, i) => g.id !== currentGroupId);
    console.log('the rest', rest);
    if (!validate.isEmpty(rest)) {
      setRemainingGroups(rest);
    } else {
      setCurrentGroupId(0);
    }
  });

  useMemo(() => {
    console.log('here tracking', category.steps);
    console.log('the selected Properties', selectedProperties);
    if (selectedProperties.length === category.steps) {
      dispatch(setProperties(selectedProperties));
    }
  }, [selectedProperties]);

  useMemo(() => {
    if (!validate.isEmpty(remainingGroups)) {
      setCurrentGroupId(first(remainingGroups).id);
    }
  }, [remainingGroups]);

  return (
    <Fragment>
      {map(remainingGroups, (group, i) => {
        return (
          <Modal
            key={i}
            transparent={false}
            animationType={'slide'}
            onRequestClose={() => setVisible(false)}
            visible={currentGroupId === group.id}>
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
      {!validate.isEmpty(properties) ? (
        <ClassifiedStorePropertiesWidget elements={properties} />
      ) : null}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    properties: state.properties
  };
}

export default connect(mapStateToProps)(CategoryGroupsScreen);

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
