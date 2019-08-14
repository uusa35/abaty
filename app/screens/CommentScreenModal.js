import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Modal, View} from 'react-native';
import {hideCommentModal} from '../redux/actions';
import {DispatchContext} from '../redux/DispatchContext';
import CommentsList from '../components/Lists/CommentsList';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

const CommentScreenModal = ({commentModal, elements, model, id}) => {
  const {dispatch} = useContext(DispatchContext);
  const [visible, setVisible] = useState(commentModal);
  return (
    <SafeAreaView horizontal="always">
      <Modal
        transparent={false}
        visible={commentModal}
        animationType={'slide'}
        onRequestClose={() => setVisible(false)}>
        <View
          style={{
            height: 80,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            zIndex: 999
          }}>
          <Icon
            raised
            name="close"
            size={15}
            style={{zIndex: 999}}
            onPress={() => dispatch(hideCommentModal())}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          />
        </View>
        <CommentsList elements={elements} model={model} id={id} />
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(CommentScreenModal);

CommentScreenModal.propTypes = {
  elements: PropTypes.array.isRequired,
  commentModal: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({});
