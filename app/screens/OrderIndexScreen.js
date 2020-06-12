import React, {Fragment, useState, useContext} from 'react';
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {isIOS} from '../constants';
import {height, text, width} from '../constants/sizes';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import {isRTL} from '../I18n';
import I18n from './../I18n';
import OrderWidget from '../components/widgets/order/OrderWidget';
import {reAuthenticate} from '../redux/actions/user';
import {ABATI} from '../../app';
import {images} from '../constants/images';
import BgContainer from '../components/containers/BgContainer';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';

const OrderIndexScreen = ({}) => {
  const {orders} = useSelector((state) => state.auth);
  const {colors, logo} = useContext(GlobalValuesContext);
  const {goBack} = useNavigation();
  const [refresh, setRefresh] = useState(false);

  return (
    <BgContainer>
      {!validate.isEmpty(orders) ? (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
            padding: 10,
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
          renderItem={({item}) => <OrderWidget element={item} logo={logo} />}
        />
      ) : (
        <ImageBackground
          style={{
            width,
            height: height,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
          source={ABATI ? images.emptyOrder : null}>
          {!ABATI ? (
            <Fragment>
              <Button
                raised
                title={I18n.t('no_orders')}
                type="outline"
                containerStyle={{marginBottom: 20, width: '90%'}}
                titleStyle={{fontFamily: text.font}}
              />
              <Button
                onPress={() => goBack()}
                raised
                title={I18n.t('shop_now')}
                type="outline"
                containerStyle={{marginBottom: 20, width: '90%'}}
                titleStyle={{
                  fontFamily: text.font,
                  color: colors.main_text_theme_color,
                }}
                col
              />
            </Fragment>
          ) : null}
        </ImageBackground>
      )}
    </BgContainer>
  );
};

export default OrderIndexScreen;

OrderIndexScreen.propTypes = {
  orders: PropTypes.array,
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
    alignItems: 'baseline',
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
