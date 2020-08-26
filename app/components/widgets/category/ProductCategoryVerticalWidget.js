import React, {Fragment, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text, width} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import {map, isNull, uniqBy} from 'lodash';
import {getSearchProducts} from '../../../redux/actions/product';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';
import Image from 'react-native-image-progress';

const ProductCategoryVerticalWidget = ({
  elements,
  user_id,
  showTitle = true,
  showArrow = true,
  showImage = false,
  showChildren = true,
  title,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const {country} = useSelector((state) => state);
  return (
    <Fragment>
      {!validate.isEmpty(elements) ? (
        <View
          key={elements.length}
          style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          {showTitle && (
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.large,
                marginBottom: 10,
                textAlign: 'left',
                color: colors.header_one_theme_color,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              }}>
              {title}
            </Text>
          )}
          {map(uniqBy(elements, 'id'), (c, i) => {
            if (!isNull(c)) {
              return (
                <Fragment key={i}>
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      dispatch(
                        getSearchProducts({
                          name: c.name,
                          searchParams: {
                            product_category_id: c.id,
                            user_id,
                            country_id: country.id,
                          },
                          redirect: true,
                        }),
                      )
                    }
                    hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                    style={[styles.itemRow]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                      }}>
                      {showImage ? (
                        <ImageLoaderContainer
                          img={c.thumb}
                          style={{
                            width: iconSizes.smaller,
                            height: iconSizes.smaller,
                            marginRight: 10,
                            marginLeft: 10,
                            alignSelf: 'center',
                          }}
                        />
                      ) : (
                        <Icon
                          type="entypo"
                          name={isRTL ? 'triangle-left' : 'triangle-right'}
                          color="grey"
                          size={iconSizes.smallest}
                          iconStyle={{
                            paddingRight: 10,
                            paddingLeft: 10,
                          }}
                        />
                      )}
                      <Text style={[styles.subTitle, {color: 'black'}]}>
                        {c.name}
                      </Text>
                    </View>
                    {showArrow && (
                      <Icon
                        type="entypo"
                        name={
                          isRTL ? 'chevron-thin-left' : 'chevron-thin-right'
                        }
                        color="lightgrey"
                        size={iconSizes.smallest}
                        iconStyle={{
                          paddingRight: isIOS ? 10 : 0,
                          paddingLeft: isIOS ? 0 : 10,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  {c.has_children && showChildren
                    ? map(c.children, (c, n) => {
                        return (
                          <TouchableOpacity
                            key={n}
                            onPress={() =>
                              dispatch(
                                getSearchProducts({
                                  name: c.name,
                                  searchParams: {product_category_id: c.id},
                                  redirect: true,
                                }),
                              )
                            }
                            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                            style={[styles.itemRow, {paddingLeft: 30}]}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              {c.thumb ? (
                                <ImageLoaderContainer
                                  img={c.thumb}
                                  style={{
                                    width: iconSizes.smaller,
                                    height: iconSizes.smaller,
                                    margin: 5,
                                  }}
                                />
                              ) : (
                                <Icon
                                  type="entypo"
                                  name={
                                    isRTL ? 'triangle-left' : 'triangle-right'
                                  }
                                  color="grey"
                                  size={iconSizes.smallest}
                                  iconStyle={{
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                  }}
                                />
                              )}
                              <Text style={styles.subTitle}>{c.name}</Text>
                            </View>
                            {showArrow ? (
                              <Icon
                                type="entypo"
                                name={
                                  isRTL
                                    ? 'chevron-thin-left'
                                    : 'chevron-thin-right'
                                }
                                color="lightgrey"
                                size={15}
                                iconStyle={{
                                  paddingRight: isIOS ? 10 : 0,
                                  paddingLeft: isIOS ? 0 : 10,
                                }}
                              />
                            ) : null}
                          </TouchableOpacity>
                        );
                      })
                    : null}
                </Fragment>
              );
            }
          })}
        </View>
      ) : (
        <View
          style={{marginTop: '20%', width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_categories')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </Fragment>
  );
};

export default ProductCategoryVerticalWidget;

ProductCategoryVerticalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
