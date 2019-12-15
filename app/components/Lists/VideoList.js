import React, {useState, useMemo, useContext} from 'react';
import validate from 'validate.js';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {text, width} from '../../constants';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import PropTypes from 'prop-types';
import VideoWidget from '../widgets/video/VideoWidget';
import {DispatchContext} from '../../redux/DispatchContext';
import {refetchHomeElements} from '../../redux/actions';
import SimpleSpinner from '../SimpleSpinner';

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
  const {dispatch} = useContext(DispatchContext);

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
          renderItem={({item}) => (
            <React.Suspense fallback={<SimpleSpinner />}>
              <VideoWidget
                element={item}
                showName={true}
                width={width}
                showImage={true}
              />
            </React.Suspense>
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
