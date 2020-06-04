import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getClassified} from '../../../redux/actions/classified';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import TagWidget from './../TagWidget';
import {getConvertedFinalPrice} from '../../../helpers';
import {useDispatch, useSelector} from 'react-redux';

const ClassifiedWidgetHorizontal = ({
  element,
  showName = false,
  widthVal = '100%',
  heightVal = '100%',
}) => {
  const {currency_symbol, exchange_rate} = useContext(GlobalValuesContext);
  const {token} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: widthVal,
          height: heightVal,
          margin: 5,
          //   borderWidth : 1,
          // borderRadius: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center',
        },
      ]}
      onPress={() =>
        dispatch(
          getClassified({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        )
      }>
      <ImageBackground
        source={{
          uri: element.thumb,
        }}
        loadingIndicatorSource={images.logo}
        style={{height: heightVal, width: widthVal}}
        imageStyle={{
          width: widthVal,
          height: heightVal,
          // borderRadius: 15,
          // borderWidth: 0.5,
          borderColor: 'lightgrey',
        }}
        resizeMode="stretch">
        <View style={{flex: 1, position: 'absolute', top: 20, right: 0}}>
          {element.is_featured ? <TagWidget tagName="featured" /> : null}
        </View>
        <View
          style={{
            width: '100%',
            bottom: 0,
            position: 'absolute',
            padding: 10,
            backgroundColor: 'white',
            opacity: 0.7,
            // borderBottomLeftRadius: 15,
            // borderBottomRightRadius: 15,
          }}>
          <Text style={{textAlign: 'left', fontFamily: text.font}}>
            {element.name}
          </Text>
          <Text style={{textAlign: 'left', fontFamily: text.font}}>
            {getConvertedFinalPrice(element.price, exchange_rate)}
            {currency_symbol}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ClassifiedWidgetHorizontal;

ClassifiedWidgetHorizontal.propTypes = {
  element: PropTypes.object.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230,
  },
});
