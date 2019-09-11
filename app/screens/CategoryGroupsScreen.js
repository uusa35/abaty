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
import {isRTL} from '../I18n';

const CategoryGroupsScreen = ({category, navigation}) => {
  [currentGroupId, setCurrentGroupId] = useState(
    first(category.categoryGroups).id
  );
  [selectedProperties, setSelectedProperties] = useState([]);
  [remainingGroups, setRemainingGroups] = useState(category.categoryGroups);

  const handleClick = useCallback(property => {
    setSelectedProperties([
      {property_id: property.id, value: property.value},
      ...selectedProperties
    ]);
    const rest = filter(remainingGroups, (g, i) => g.id !== currentGroupId);
    if (rest.length > 0) {
      setRemainingGroups(rest);
    } else {
      console.log('done');
    }
  });

  useMemo(() => {
    console.log('new id', first(remainingGroups).id);
    if (remainingGroups.length > 0) {
      setCurrentGroupId(first(remainingGroups).id);
    }
  }, [remainingGroups]);
  console.log('selected', selectedProperties);
  return (
    <Fragment>
      {map(remainingGroups, (group, i) => {
        return (
          <Modal
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
                borderWidth: 5,
                flex: 0.9,
                width: '100%'
              }}>
              <View>
                {map(group.properties, (property, i) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'baseline',
                        height: 50,
                        borderBottomWidth: 0.5,
                        borderColor: 'lightgrey',
                        padding: 10
                      }}
                      onPress={() => handleClick(property)}
                      key={i}>
                      <Icon type="font-awesome" name={property.icon} />
                      <Text
                        style={{
                          fontFamily: text.font,
                          fontSize: text.medium,
                          paddingLeft: 20,
                          paddingRight: 20
                        }}>
                        {property.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Modal>
        );
      })}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category
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
  }
});
