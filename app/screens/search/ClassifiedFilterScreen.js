import React, {Fragment, useContext, useState} from 'react';
import {Modal, View, ScrollView, Text, FlatList} from 'react-native';
import {DispatchContext} from '../../redux/DispatchContext';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';
import {hideCommentModal} from '../../redux/actions';
import styles from './../../components/widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';

const ClassifiedFilterScreen = () => {
  const {dispatch} = useContext(DispatchContext);
  const {goBack} = useNavigation();
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      transparent={false}
      visible={visible}
      animationType={'slide'}
      onRequestClose={() => setVisible(false)}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={{
          // width: '100%',
          // padding: 10,
          borderWidth: 10,
          backgroundColor: 'blue',
          marginTop: 100
        }}
        ListHeaderComponent={
          <Icon
            name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
            type="entypo"
            size={25}
            style={{zIndex: 999}}
            onPress={() => {
              setVisible(false);
              return goBack();
            }}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          />
        }>
        <View style={{marginTop: 100}}>
          <Icon
            name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
            type="entypo"
            size={25}
            style={{zIndex: 999}}
            onPress={() => {
              setVisible(false);
              return goBack();
            }}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          />
          <Text>filter screen</Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ClassifiedFilterScreen;
