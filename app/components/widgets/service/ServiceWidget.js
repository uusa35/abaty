import React, {Fragment, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, touchOpacity} from '../../../constants/sizes';
import TagWidget from './../TagWidget';
import {useDispatch} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {getCompany} from '../../../redux/actions/user';
import {images} from '../../../constants/images';

const ServiceWidget = ({
  element,
  showName = false,
  minWidth = 150,
  height = 240,
  handleClick,
}) => {
  const {colors, currency_symbol, exchange_rate} = useContext(
    GlobalValuesContext,
  );
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[widgetStyles.productServiceWidget, {minWidth}]}
      onPress={() => handleClick(element)}>
      <ImageBackground
        source={images.loading}
        style={{height: 240, width: '100%'}}>
        <Fragment>
          <ImageLoaderContainer
            img={element.thumb}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{flex: 1, position: 'absolute', bottom: 20, right: 0}}>
            {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
            {element.isOnSale ? (
              <TagWidget tagName="under_sale" bgColor="red" />
            ) : null}
            {element.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
          </View>
        </Fragment>
      </ImageBackground>
      {showName && (
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          {element.user && height < 240 && (
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  getCompany({
                    id: element.user.id,
                    searchParams: {user_id: element.user.id},
                    redirect: true,
                  }),
                )
              }
              style={{
                width: '100%',
                paddingTop: 5,
                paddingRight: 10,
                paddingLeft: 10,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <ImageLoaderContainer
                img={element.user.thumb}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  marginRight: 10,
                }}
              />
              <Text
                style={[
                  widgetStyles.elementName,
                  {
                    fontSize: text.medium,
                    color: colors.header_tow_theme_color,
                  },
                ]}>{`${element.user.slug}`}</Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              width: '100%',
              paddingTop: 5,
              paddingRight: 10,
              paddingLeft: 10,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.medium,
                  color: colors.header_tow_theme_color,
                },
              ]}>
              {element.name.substring(0, 20)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  widgetStyles.elementName,
                  {
                    textAlign: 'center',
                    fontSize: text.medium,
                    paddingRight: 5,
                    paddingLeft: 5,
                  },
                ]}>
                {getConvertedFinalPrice(element.finalPrice, exchange_rate)}
              </Text>
              <Text style={widgetStyles.elementName}>{currency_symbol}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ServiceWidget);

ServiceWidget.propTypes = {
  element: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: '100%',
    height: 240,
  },
});
