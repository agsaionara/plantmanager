import React, { useState } from  'react'
import {SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, 
        TouchableWithoutFeedback, Touchable, Keyboard, Alert} from 'react-native'
import colors from '../styles/colors'
//import fonts from '../styles/fonts'

import {Button} from   '../components/Button'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    async function handleSubmite(){
        if(!name)
            return Alert.alert("Me diz como chamar você 😥")
        
        try {
            await AsyncStorage.setItem('@plantmanager:user',name);
            navigation.navigate('Confirmation', {
                title: "Prontinho",
                subtitle: "Agora vamos cuidar da sua plantinha com muito cuidado",
                buttonTitle: "Começar",
                icon: 'smile',
                nextScreen: "PlantSelect"
            })
        } catch{
            Alert.alert("Não foi possivel salvar o seu nome 😥")
        }       
    }

    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    return(
        <SafeAreaView style = {styles.container}>
            <KeyboardAvoidingView 
                style = {styles.container} 
                behavior = {Platform.OS == 'ios' ? 'padding': 'heigth'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style = {styles.header}>
                            <Text style={styles.emoji}>                    
                                {isFilled ? '😊' : '😁'}
                            </Text>
                            <Text style = {styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                        </View>
                        
                        <TextInput 
                            style = {[
                                styles.input,
                                (isFocused || isFilled) && {borderColor: colors.green}
                            ]} 
                            placeholder = "Digite o nome"
                            onBlur ={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText ={handleInputChange}
                        >
                                
                        </TextInput>
                        
                        <View style={styles.footer}>
                            < Button
                                title= "Confirmar"
                                onPress ={handleSubmite}
                            />
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    }, 
    content:{
        flex: 1,
        width: '100%'
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header:{
        alignItems:'center'
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize:18,
        marginTop: 50,
        padding: 10, 
        textAlign: 'center'
    },
    title:{
        fontSize:24, 
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        //fontFamily: fonts.heading,
        marginTop: 20
    }, 
    footer:{
        width: '100%', 
        marginTop:40,
        paddingHorizontal:20
    }
})