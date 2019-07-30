import React from 'react'
import { View , Text , StyleSheet } from 'react-native';
import { text } from "../../constants";
import {appUrlIos} from "../../env";
import {WebView} from "react-native-webview";

const VideoWidget = ({ element , height = 120, width = 180 }) => {
    return (
        <View style={{ flexDirection : 'column', justifyContent : 'center', alignItems : 'center', flex : 1}}>
            <WebView
                key={element.id}
                style={{
                    height,
                    width: width,
                }}
                javaScriptEnabled={true}
                source={{uri: `${appUrlIos}webview?url=${element.url}`}}
            />
            <Text style={styles.title}>{element.name}</Text>
            <Text style={styles.caption}>{element.caption}</Text>
        </View>
    );
}

export default React.memo(VideoWidget);

const styles = StyleSheet.create({
    title : {
        paddingTop: 10, fontFamily : text.font , fontSize : text.medium , textAlign: 'left'
    },
    caption : {
        paddingTop: 10, fontFamily : text.font , fontSize : text.small , textAlign: 'left'
    }
})