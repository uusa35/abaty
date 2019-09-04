import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getClassified} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {images} from '../../../constants';
import TagWidget from './../TagWidget';

const ClassifiedWidgetHorizontal = ({
  element,
  showName = false,
  dispatch,
  colors,
  widthVal = '100%',
  heightVal = '100%'
}) => {
  const {currency_symbol, token} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: widthVal,
          height: heightVal,
          margin: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'center'
        }
      ]}
      onPress={() =>
        dispatch(
          getClassified({id: element.id, api_token: token ? token : null})
        )
      }>
      <ImageBackground
        source={{
          uri: element.thumb
        }}
        loadingIndicatorSource={images.logo}
        style={{height: heightVal, width: widthVal}}
        imageStyle={{
          width: widthVal,
          height: heightVal,
          borderRadius: 20,
          borderWidth: 0.5,
          borderColor: 'lightgrey'
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
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}>
          <Text>{element.name}</Text>
          <Text>
            {element.price} {currency_symbol}
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
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230
  }
});
