import React, {useContext, useState, useMemo} from 'react';
import {RefreshControl, FlatList, View, StyleSheet} from 'react-native';
import {
  getDesigner,
  hideCommentModal,
  refetchHomeCategories
} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {text, width} from './../../constants';
import {Button, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import CommentWidget from '../widgets/comment/CommentWidget';
import {SafeAreaView} from 'react-navigation';
import AddCommentFormWidget from '../widgets/comment/AddCommentFormWidget';
import I18n, {isRTL} from '../../I18n';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const CommentsList = ({elements, model, id}) => {
  const [refresh, setRefresh] = useState(false);
  const {dispatch} = useContext(DispatchContext);
  const {guest} = useContext(GlobalValuesContext);

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
      {validate.isEmpty(elements) ? (
        <Button
          raised
          containerStyle={{width: '90%'}}
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
      {!guest ? <AddCommentFormWidget model={model} id={id} /> : null}
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
