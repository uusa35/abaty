import React, {useState, useContext, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import {hideCommentModal, hideLoginModal} from '../redux/actions';
import {DispatchContext} from '../redux/DispatchContext';
import LoginForm from '../components/widgets/LoginForm';
import CommentsList from '../components/Lists/CommentsList';

const CommentScreenModal = ({commentModal, elements}) => {
  const {dispatch} = useContext(DispatchContext);
  const [visible, setVisible] = useState(commentModal);
  useMemo(() => {
    if (!visible) {
      return dispatch(hideCommentModal());
    }
  }, [visible]);
  return (
    <Modal
      transparent={false}
      visible={commentModal}
      animationType={'slide'}
      onRequestClose={() => setVisible(false)}>
      <View
        style={{
          flex: 0.1,
          padding: 10,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
        <Icon
          name="close"
          size={25}
          onPress={() => dispatch(hideCommentModal())}
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        />
      </View>
      <View
        style={{
          flex: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -50
        }}>
        <CommentsList elements={elements} />
      </View>
    </Modal>
  );
};

export default React.memo(CommentScreenModal);

CommentScreenModal.propTypes = {
  elements: PropTypes.array.isRequired,
  commentModal: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({});
