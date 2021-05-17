import React, {useEffect, useState} from  'react'

import {View, Text, StyleSheet, Image} from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

import colors from '../styles/colors'

import userImg from '../assets/saionara.jpg'
import fonts from '../styles/fonts'
//import { useFonts } from '@expo-google-fonts/jost'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(()=>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    }, []);

    return(
        <View style = {styles.container}>
            <View>
                <Text style = {styles.greeting}>
                    Olá,
                </Text>
                <Text style = {styles.userName}>
                    {userName}
                </Text>
            </View>

            <Image source={userImg} style = {styles.img}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        padding: 20
    },
    img:{
        width:70,
        height:70,
        borderRadius: 40
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
})