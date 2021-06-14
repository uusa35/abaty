import React, {useContext, useState, useMemo} from 'react';
import {
  RefreshControl,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {bottomContentInset, text, width} from './../../constants/sizes';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import CommentWidget from '../widgets/comment/CommentWidget';
import AddCommentFormWidget from '../widgets/comment/AddCommentFormWidget';
import I18n from '../../I18n';
import validate from 'validate.js';
import {hideCommentModal} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CommentsList = ({elements, model, id}) => {
  const {navigate} = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const {guest} = useSelector(state => state);
  const dispatch = useDispatch();

  useMemo(() => {
    if (refresh) {
      return setRefresh(false);
    }
  }, [refresh]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <View>
        {!guest ? <AddCommentFormWidget model={model} id={id} /> : null}
        {guest ? (
          <Button
            onPress={() => {
              dispatch(hideCommentModal());
              return navigate('Register');
            }}
            raised
            containerStyle={{width: width - 20, marginBottom: 20}}
            title={I18n.t('register_with_us')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        ) : null}
      </View>
      {validate.isEmpty(elements) ? (
        <Button
          raised
          containerStyle={{width: width - 20}}
          title={I18n.t('no_comments')}
          type="outline"
          titleStyle={{fontFamily: text.font}}
        />
      ) : (
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // stickyHeaderIndices={[0]}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          contentInset={{bottom: bottomContentInset}}
          style={{paddingBottom: bottomContentInset}}
          numColumns={1}
          data={elements}
          refreshing={refresh}
          contentInset={{bottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
            />
          }
          contentContainerStyle={{
            width,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          renderItem={({item}) => <CommentWidget element={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default CommentsList;

CommentsList.propTypes = {
  elements: PropTypes.array.isRequired,
  columns: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
});
