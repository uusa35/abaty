import React, {useState, useMemo, useContext} from 'react';
import validate from 'validate.js';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {bottomContentInset, text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import PropTypes from 'prop-types';
import VideoWidget from '../widgets/video/VideoWidget';
import {refetchHomeElements} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const VideoList = ({
  elements,
  showSearch = false,
  showTitle = true,
  showFooter = false,
  title = '',
}) => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [endList, setEndList] = useState(false);
  const dispatch = useDispatch();

  useMemo(() => {
    if (refresh) {
      setRefresh(false);
      dispatch(refetchHomeElements());
    } else {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {!validate.isEmpty(elements) ? (
        <FlatList
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
              onRefresh={() => setRefresh(true)}
            />
          }
          onEndReached={() => {
            search.length > 0 ? setIsLoading(false) : setIsLoading(!isLoading);
            setEndList(false);
          }}
          contentContainerStyle={{
            width: width - 20,
          }}
          ListFooterComponent={() =>
            showFooter ? (
              <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
                <Button
                  loading={endList}
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
              showImage={true}
            />
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            width: width - 50,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Button
            raised
            title={I18n.t('no_videos')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </View>
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
