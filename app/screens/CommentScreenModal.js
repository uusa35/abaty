import React, {useState, useContext, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';
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
    <SafeAreaView>
      <Modal
        transparent={false}
        visible={commentModal}
        animationType={'slide'}
        onRequestClose={() => setVisible(false)}>
        <View
          style={{
            padding: 5,
            paddingTop: 40,
            justifyContent: 'center',
            alignItems: 'flex-end'
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
            justifyContent: 'center'
          }}>
          <CommentsList elements={elements} />
        </View>
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
