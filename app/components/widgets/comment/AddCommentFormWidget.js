import React, {useState, useContext} from 'react';
import {text, width} from '../../../constants/sizes';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {addComment} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const AddCommentFormWidget = ({model, id}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  return (
    <View
      style={{
        width: width - 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <Input
        placeholder={I18n.t('title') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 10,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        shake={true}
        keyboardType="default"
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <Input
        placeholder={I18n.t('content') + '*'}
        numberOfLines={3}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 10,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
          height: 70,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        value={content}
        shake={true}
        keyboardType="default"
        onChangeText={content => setContent(content)}
      />
      <Button
        onPress={() => {
          setTitle('');
          setContent('');
          return dispatch(addComment({title, content, model, id}));
        }}
        raised
        title={I18n.t('submit_comment')}
        type="outline"
        containerStyle={{width: '90%'}}
        titleStyle={{fontFamily: text.font}}
      />
    </View>
  );
};

AddCommentFormWidget.propTypes = {
  model: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default AddCommentFormWidget;
