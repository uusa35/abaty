import React, {useContext, useState, useMemo} from 'react';
import {Modal, ScrollView} from 'react-native';
import {DispatchContext} from '../../redux/DispatchContext';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';
import {useNavigation} from 'react-navigation-hooks';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {SafeAreaView} from 'react-navigation';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HIDE_SEARCH_MODAL} from '../../redux/actions/types';

const ClassifiedFilterScreen = () => {
  const {dispatch} = useContext(DispatchContext);
  const {searchModal, categories} = useContext(GlobalValuesContext);
  const {goBack} = useNavigation();
  const [visible, setVisible] = useState(searchModal);

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
            width: '96%',
            alignItems: 'baseline',
            padding: 10
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
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default ClassifiedFilterScreen;
