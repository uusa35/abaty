import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {text} from '../../../constants';
import {getConvertedFinalPrice} from '../../../helpers';
import validate from 'validate.js';
import PropertiesWidget from './PropertiesWidget';

const ClassifiedInfoWidget = ({
  element,
  colors,
  exchange_rate,
  currency_symbol
}) => {
  return (
    <View
      onPress={() => console.log('clicked')}
      style={{
        width: '100%',
        minHeight: 50,
        flex: 1,
        justifyContent: 'space-between'
      }}>
      <Fragment>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: text.medium,
              color: colors.header_tow_theme_color
            }}>
            {element.name.substring(0, 20)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.medium,
                  paddingRight: 5,
                  paddingLeft: 5
                }
              ]}>
              {getConvertedFinalPrice(element.price, exchange_rate)}
            </Text>
            <Text style={widgetStyles.elementName}>{currency_symbol}</Text>
          </View>
        </View>
        {!validate.isEmpty(element.properties) ? (
          <PropertiesWidget elements={element.properties} colors={colors} />
        ) : null}
      </Fragment>
    </View>
  );
};

export default ClassifiedInfoWidget;
