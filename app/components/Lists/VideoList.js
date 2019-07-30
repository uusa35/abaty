import React, { useState , useMemo , useContext } from 'react';
import validate from 'validate.js';
import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import {text, width} from "../../constants";
import {Button, Icon, Input} from "react-native-elements";
import I18n, {isRTL} from "../../I18n";
import PropTypes from "prop-types";
import {GlobalValuesContext} from "../../redux/GlobalValuesContext";
import VideoWidget from "../widgets/VideoWidget";
import { first } from 'lodash';
import {DispatchContext} from "../../redux/DispatchContext";
import { refetchHomeElements } from "../../redux/actions";

const VideoList = ({ elements, showSearch = false , showTitle = true, showFooter = false , title = '' }) => {
    const [search,setSearch] = useState('');
    const [refresh,setRefresh] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [endList,setEndList] = useState(false);
    const { colors } = useContext(GlobalValuesContext);
    const { dispatch } = useContext(DispatchContext);

    useMemo(() => {
        if(refresh) {
            setRefresh(false);
            dispatch(refetchHomeElements());
        } else {
            setRefresh(false);
        }
    },[refresh]);

    return (
        <View style={{ flex: 1, alignItems : 'center', justifyContent : 'center'}}>
        {!validate.isEmpty(elements) ? (
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
            numColumns={2}
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
                width : width - 20,
            }}
            columnWrapperStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10, paddingBottom : 10
            }}
            ListHeaderComponentStyle={{
                paddingBottom: 10,
                paddingTop : 10,
                backgroundColor: 'white'
            }}
            ListHeaderComponent={
                    <VideoWidget element={first(elements)} height={250} width={width}/>
            }
            ListFooterComponent={() =>
                showFooter ? (
                    <View style={{minHeight: 100}}>
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
                <VideoWidget element={item} showName={true} width={190}/>
            )}
        />
    ) : (
        <View style={{marginTop: 300, width: width - 50, alignSelf: 'center'}}>
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
}

export default React.memo(VideoList);

VideoList.propTypes = {
    elements: PropTypes.array.isRequired,
    showName: PropTypes.bool,
    showFooter : PropTypes.bool,
    showTitle : PropTypes.bool
};

const styles = StyleSheet.create({});