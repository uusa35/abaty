import React, {useContext, useState, useMemo} from 'react';
import {RefreshControl, FlatList, StyleSheet, View} from 'react-native';
import {text, width} from './../../constants';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import CommentWidget from '../widgets/comment/CommentWidget';
import {SafeAreaView} from 'react-navigation';
import AddCommentFormWidget from '../widgets/comment/AddCommentFormWidget';
import I18n from '../../I18n';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';
import {hideCommentModal} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';

const CommentsList = ({elements, model, id}) => {
  const [refresh, setRefresh] = useState(false);
  const {guest} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  const {dispatch} = useContext(DispatchContext);

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
        height: '100%'
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
            alignItems: 'center'
          }}
          renderItem={({item}) => <CommentWidget element={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default React.memo(CommentsList);

CommentsList.propTypes = {
  elements: PropTypes.array.isRequired,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  wrapper: {
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
});
