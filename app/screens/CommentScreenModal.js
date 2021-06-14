import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Modal, View, SafeAreaView} from 'react-native';
import {hideCommentModal} from '../redux/actions';
import CommentsList from '../components/Lists/CommentsList';
import {Icon} from 'react-native-elements';
import {isRTL} from '../I18n';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CommentScreenModal = ({commentModal, elements, model, id}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(commentModal);
  return (
    <SafeAreaView horizontal="always">
      <View style={{backgroundColor: 'white'}}>
        <Modal
          transparent={false}
          visible={commentModal}
          animationType={'slide'}
          onRequestClose={() => setVisible(false)}>
          <View style={styles.iconModalWrapper}>
            <Icon
              name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
              type="entypo"
              size={25}
              style={{zIndex: 999}}
              onPress={() => dispatch(hideCommentModal())}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
          </View>
          <CommentsList elements={elements} model={model} id={id} />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CommentScreenModal;

CommentScreenModal.propTypes = {
  elements: PropTypes.array.isRequired,
  commentModal: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  iconModalWrapper: {
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    zIndex: 999,
  },
});
