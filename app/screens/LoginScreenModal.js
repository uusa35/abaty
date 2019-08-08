import React, {useState, useContext, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View, Linking, Modal} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text} from '../constants';
import {hideLoginModal, showLoginModal, submitAuth} from '../redux/actions';
import FastImage from 'react-native-fast-image';
import {appUrlIos} from './../env';
import {colorsSelector, loginModalSelector, logoSelector} from '../redux/selectors/collection';
import {DispatchContext} from '../redux/DispatchContext';

const LoginScreenModal = ({colors, logo, loginModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('password');
    const {dispatch} = useContext(DispatchContext);
    const [visible, setVisible] = useState(loginModal);
    console.log('the loginModal', loginModal);
    useMemo(() => {
        if(!visible) {
            return dispatch(hideLoginModal());
        }
    },[visible])
    return (
        <Modal
            transparent={false}
            visible={loginModal}
            animationType={'slide'}
            onRequestClose={() => setVisible(false)}>
        <View style={{flex: 0.1 , padding: 10, paddingTop: 20,  justifyContent: 'center', alignItems: 'flex-start'}}>
            <Icon
                name="close"
                size={25}
                onPress={() => dispatch(hideLoginModal())}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
        </View>
        <View style={{flex: 0.9 , justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
                <FastImage
                    source={{uri: logo}}
                    style={{width: 100, height: 100, margin: 20}}
                    resizeMode="contain"
                    loadingIndicatorSource={images.logo}
                />
                <Input
                    placeholder={I18n.t('email')}
                    inputContainerStyle={{
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 20
                    }}
                    inputStyle={{
                        fontFamily: text.font,
                        textAlign: isRTL ? 'right' : 'left'
                    }}
                    shake={true}
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                />
                <Input
                    placeholder={I18n.t('password')}
                    secureTextEntry={true}
                    inputContainerStyle={{
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        marginBottom: 20
                    }}
                    inputStyle={{
                        fontFamily: text.font,
                        textAlign: isRTL ? 'right' : 'left'
                    }}
                    shake={true}
                    keyboardType="default"
                    onChangeText={password => setPassword(password)}
                />
                <Button
                    raised
                    containerStyle={{marginBottom: 50, width: '100%'}}
                    buttonStyle={{
                        backgroundColor: colors.btn_bg_theme_color,
                        borderRadius: 0
                    }}
                    title={I18n.t('login')}
                    titleStyle={{
                        fontFamily: text.font,
                        color: colors.btn_text_theme_color
                    }}
                    onPress={() => dispatch(submitAuth({email, password}))}
                />
            </View>
        </View>
        </Modal>
    );
};

export default React.memo(LoginScreenModal);

LoginScreenModal.propTypes = {
    token: PropTypes.string,
    colors: PropTypes.object,
    logo: PropTypes.string
};

const styles = StyleSheet.create({});
