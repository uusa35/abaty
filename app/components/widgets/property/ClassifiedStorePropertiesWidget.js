import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from '../../../constants/sizes';
import I18n from '../../../I18n';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import validate from 'validate.js';
import ImageLoaderContainer from '../ImageLoaderContainer';

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
      {!validate.isEmpty(elements) ? (
        <Fragment>
          {map(elements, (e, i) => {
            return (
              <View style={styles.propertiesWrapper} key={i}>
                {!validate.isEmpty(e.category_group.thumb) ? (
                  <ImageLoaderContainer
                    img={e.category_group.thumb}
                    style={{width: 30, height: 30}}
                  />
                ) : (
                  <Icon type="font-awesome" name={e.property.icon} />
                )}
                <View style={styles.infoWrapper}>
                  <Text style={styles.title}>
                    {e.category_group.name.substring(0, 15)}
                  </Text>
                  {/*<Text style={styles.title}>{p.property.name}</Text>*/}
                  <Text style={styles.title}>
                    {e.category_group.is_multi
                      ? e.property.name
                      : e.property.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </Fragment>
      ) : null}
    </View>
  );
};

export default ClassifiedStorePropertiesWidget;

ClassifiedStorePropertiesWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: '5%',
    paddingBottom: 20,
    width: '100%',
    alignItems: 'baseline',
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
    fontSize: text.large,
    alignSelf: 'center',
    // paddingTop: 10,
    marginTop: 5,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flex: 1,
  },
});
