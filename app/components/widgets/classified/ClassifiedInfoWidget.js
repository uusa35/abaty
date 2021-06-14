import React, {useContext, Fragment} from 'react';
import {Text, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {text} from '../../../constants/sizes';
import {getConvertedFinalPrice} from '../../../helpers';
import validate from 'validate.js';
import PropertiesWidget from './PropertiesWidget';
import I18n from './../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {filter} from 'lodash';

const ClassifiedInfoWidget = ({element, exchange_rate, currency_symbol}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      //onPress={() => console.log('clicked')}
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: -5,
      }}>
      <Fragment>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            opacity: 0.7,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
          }}>
          <View>
            <Text
              style={{
                textAlign: 'left',
                fontSize: text.large,
                paddingBottom: 10,
                fontFamily: text.font,
                color: colors.header_tow_theme_color,
              }}>
              {element.name.substring(0, 20)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.small,
                textAlign: 'left',
              }}>
              {I18n.t('added_from')} {element.created_at}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
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
                {getConvertedFinalPrice(element.price, exchange_rate)}
              </Text>
              <Text style={widgetStyles.elementName}>{currency_symbol}</Text>
            </View>
            <Text style={{fontFamily: text.font}}>
              {`${element.views} ${I18n.t('views')}`}
            </Text>
          </View>
        </View>
        {!validate.isEmpty(element.items) ? (
          <PropertiesWidget
            elements={filter(
              element.items,
              item => !item.categoryGroup.is_multi,
            )}
          />
        ) : null}
      </Fragment>
    </View>
  );
};

export default ClassifiedInfoWidget;
