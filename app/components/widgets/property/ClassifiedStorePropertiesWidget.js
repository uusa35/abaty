import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../constants';
import I18n from '../../../I18n';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {map} from 'lodash';

const ClassifiedStorePropertiesWidget = ({elements, name = ''}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{I18n.t('classified_properties')}</Text>
      {name ? (
        <View>
          <Text style={styles.title}>
            {I18n.t('category_name')} {name}
          </Text>
        </View>
      ) : null}
      {map(elements, (p, i) => {
        return (
          <View style={styles.propertiesWrapper} key={i}>
            {p.icon ? (
              <Icon type="font-awesome" name={p.icon} />
            ) : (
              <FastImage
                source={{uri: p.thumb}}
                style={{width: 30, height: 30}}
              />
            )}
            <View style={styles.infoWrapper}>
              <Text style={styles.title}>{p.name}</Text>
              <Text style={styles.title}>{p.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ClassifiedStorePropertiesWidget;

ClassifiedStorePropertiesWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  name: PropTypes.string
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: '5%',
    paddingBottom: 20,
    width: '100%'
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
    fontSize: text.large,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
});
