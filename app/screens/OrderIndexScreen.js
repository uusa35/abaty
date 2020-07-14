import React, {Fragment, useState, useContext, useMemo} from 'react';
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {isIOS} from '../constants';
import {text} from '../constants/sizes';
import validate from 'validate.js';
import {isRTL} from '../I18n';
import BgContainer from '../components/containers/BgContainer';
import ElementsHorizontalList from '../components/Lists/ElementsHorizontalList';
import {ABATI} from '../../app';

const OrderIndexScreen = ({}) => {
  const {orders} = useSelector((state) => state.auth);
  const [currentElements, setCurrentElements] = useState([]);

  useMemo(() => {
    if (!validate.isEmpty(orders)) {
      setCurrentElements(orders);
    }
  }, [orders]);

  return (
    <BgContainer>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={{}}
        type="order"
        showRefresh={false}
        showFooter={true}
        showSearch={false}
        showSortSearch={false}
        showProductsFilter={false}
        showTitleIcons={false}
        showMore={false}
        emptyListImage={ABATI ? 'emptyOrder' : ''}
      />
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
