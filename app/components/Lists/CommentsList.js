import React, {useContext, useState, useMemo} from 'react';
import {
  RefreshControl,
  ScrollView,
  FlatList,
  View,
  StyleSheet
} from 'react-native';
import CategoryWidget from '../widgets/CategoryWidget';
import {hideCommentModal, refetchHomeCategories} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {map} from 'lodash';
import {height, text, width} from './../../constants';
import validate from 'validate.js';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import CommentWidget from '../widgets/comment/CommentWidget';
import {SafeAreaView} from 'react-navigation';

const CommentsList = ({elements, columns}) => {
  const [refresh, setRefresh] = useState(false);
  const {dispatch} = useContext(DispatchContext);

  useMemo(() => {
    if (refresh) {
      dispatch(refetchHomeCategories());
      return setRefresh(false);
    }
  }, [refresh]);

  return (
    <SafeAreaView>
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={1}
        numColumns={1}
        data={elements}
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }
        contentContainerStyle={{
          width: width,
          minHeight: height,
          justifyContent: 'flex-start',
          alignItems: 'flex-end'
        }}
        ListHeaderComponentStyle={{
          padding: 10
        }}
        ListHeaderComponent={
          <Icon
            name="close"
            size={25}
            onPress={() => dispatch(hideCommentModal())}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          />
        }
        renderItem={({item}) => <CommentWidget element={item} />}
      />
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
