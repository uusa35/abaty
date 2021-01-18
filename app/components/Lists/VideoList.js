import React, {useState, useMemo, useContext} from 'react';
import validate from 'validate.js';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {bottomContentInset, height, text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import PropTypes from 'prop-types';
import VideoWidget from '../widgets/video/VideoWidget';
import {refetchHomeElements} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import EmptyListWidget from './EmptyListWidget';
import {animations} from '../../constants/animations';
import {reAuthenticate} from '../../redux/actions/user';

const VideoList = ({
  elements,
  showSearch = false,
  showTitle = true,
  showFooter = false,
  title = '',
}) => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(refetchHomeElements());
  };

  return (
    <FlatList
      ListEmptyComponent={
        <EmptyListWidget
          title={I18n.t('no_videos')}
          emptyAnimation={animations.emptyShape}
        />
      }
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="none"
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // stickyHeaderIndices={[0]}
      keyExtractor={(item, index) => index.toString()}
      contentInset={{bottom: bottomContentInset}}
      style={{paddingBottom: bottomContentInset}}
      onEndReachedThreshold={1}
      numColumns={1}
      data={elements}
      refreshing={refresh}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => handleRefresh()}
        />
      }
      contentContainerStyle={{
        marginBottom: 15,
        alignSelf: 'center',
        minHeight: height,
        minWidth: '100%',
        flexGrow: 1,
        paddingBottom: 200,
      }}
      ListFooterComponent={() =>
        showFooter && !validate.isEmpty(elements) ? (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <Button
              raised
              title={I18n.t('no_more_videos')}
              type="outline"
              titleStyle={{fontFamily: text.font}}
            />
          </View>
        ) : null
      }
      ListFooterComponentStyle={{
        marginBottom: bottomContentInset,
      }}
      renderItem={({item}) => (
        <VideoWidget
          key={item.id}
          element={item}
          showName={true}
          width={width}
          height={300}
          showImage={true}
        />
      )}
    />
  );
};

export default VideoList;

VideoList.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
  showFooter: PropTypes.bool,
  showTitle: PropTypes.bool,
};

const styles = StyleSheet.create({});
