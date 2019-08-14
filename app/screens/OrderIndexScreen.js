import React, {useContext} from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import {connect} from 'react-redux';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import {isIOS, text, width} from '../constants';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import {isRTL} from '../I18n';
import I18n from './../I18n';
import {ordersSelector} from '../redux/selectors/collections';
import {appUrlIos} from '../env';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {map} from 'lodash';

const OrderIndexScreen = ({orders}) => {
  console.log('the orders', orders);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <ScrollView
      contentContainerStyle={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 100}}>
      {!validate.isEmpty(orders) ? (
        <View
          animation="fadeInUpBig"
          easing="ease-out"
          style={{
            marginTop: 50,
            width: width - 50,
            alignSelf: 'center'
          }}>
          {map(orders, (o, i) => (
            <Button
              key={i}
              onPress={() =>
                Linking.openURL(`${appUrlIos}/view/invoice/${o.id}`)
              }
              title={o.name}
              raised
              containerStyle={{marginBottom: 10, width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                borderRadius: 0
              }}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
            />
          ))}
        </View>
      ) : (
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '90%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          title={I18n.t('no_orders')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
        />
      )}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    orders: ordersSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(OrderIndexScreen));

OrderIndexScreen.propTypes = {
  orders: PropTypes.array
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left'
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left'
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
