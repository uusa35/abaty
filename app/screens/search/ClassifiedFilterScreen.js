import React, {useContext, useState, useMemo, Fragment} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Modal, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';
import {useNavigation} from 'react-navigation-hooks';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {SafeAreaView} from 'react-navigation';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HIDE_SEARCH_MODAL} from '../../redux/actions/types';
import ProductWidgetQtyBtns from '../../components/widgets/product/ProductWidgetQtyBtns';

const ClassifiedFilterScreen = ({
  category,
  dispatch,
  searchModal,
  categories
}) => {
  const [visible, setVisible] = useState(searchModal);
  const [requestQty, setRequestQty] = useState(0);
  const {goBack} = useNavigation();

  useMemo(() => {
    if (!visible) {
      dispatch({type: HIDE_SEARCH_MODAL});
    }
  }, [visible]);

  return (
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={visible}
        animationType={'slide'}
        onRequestClose={() => dispatch({type: HIDE_SEARCH_MODAL})}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            marginTop: 40,
            flexDirection: 'row',
            width: '100%',
            padding: 10
          }}>
          <View>
            <View
              style={{
                borderWidth: 5,
                flexDirection: 'row',
                alignItems: 'baseline'
              }}>
              <Icon
                name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                type="entypo"
                size={25}
                containerStyle={{padding: 0, margin: 0}}
                style={{zIndex: 999}}
                onPress={() => {
                  setVisible(false);
                  return goBack();
                }}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              />
              <ClassifiedSearchForm />
            </View>
            <ProductWidgetQtyBtns
              qty={10}
              requestQty={requestQty}
              setRequestQty={setRequestQty}
            />
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category,
    categories: state.categories,
    searchModal: state.searchModal
  };
}

export default connect(mapStateToProps)(ClassifiedFilterScreen);
