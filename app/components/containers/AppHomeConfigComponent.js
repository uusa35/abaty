import React, {Fragment, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import I18n from '../../I18n';
import ConfirmationModal from '../ConfirmationModal';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {goBackBtn} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const AppHomeConfigComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useAndroidBackHandler(() => {
    if (route.name !== 'Home') {
      return navigation.goBack();
    } else {
      setModalVisible(true);
      return dispatch(goBackBtn('No'));
    }
  });

  return (
    <ConfirmationModal
      handleConfirmClick={() => BackHandler.exitApp()}
      confirmTitle={I18n.t('confirm')}
      message={I18n.t('do_you_want_to_exit_the_app')}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      iconName="exclamationcircleo"
      iconType="antdesign"
    />
  );
};

export default React.memo(AppHomeConfigComponent);
