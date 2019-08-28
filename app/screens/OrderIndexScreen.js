import React, {useState} from 'react';
import {StyleSheet, RefreshControl, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import {isIOS, text} from '../constants';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import {isRTL} from '../I18n';
import I18n from './../I18n';
import {ordersSelector} from '../redux/selectors/collections';
import {map} from 'lodash';
import OrderWidget from '../components/widgets/order/OrderWidget';
import {colorsSelector, logoSelector} from '../redux/selectors/collection';
import {reAuthenticate} from '../redux/actions';

const OrderIndexScreen = ({orders, colors, logo, dispatch}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <View>
      {!validate.isEmpty(orders) ? (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '95%',
            marginTop: 10
          }}
          style={{alignSelf: 'center'}}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          numColumns={1}
          data={orders}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => dispatch(reAuthenticate())}
            />
          }
          renderItem={({item}) => (
            <OrderWidget element={item} colors={colors} logo={logo} />
          )}
        />
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
    </View>
  );
};

function mapStateToProps(state) {
  return {
    orders: ordersSelector(state),
    logo: logoSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(OrderIndexScreen);

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
