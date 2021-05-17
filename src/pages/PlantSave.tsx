import React, { useState } from 'react'
import {
    Alert, Text, View, StyleSheet, Image, Platform, TouchableOpacity, ScrollView
} from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import {SvgFromUri} from 'react-native-svg'
import { Button } from '../components/Button'
import {useNavigation, useRoute} from '@react-navigation/core'
import  DateTimePicker, {Event} from '@react-native-community/datetimepicker'

import waterdrop from '../assets/waterdrop.png'


import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { format, isBefore } from 'date-fns'
import { color } from 'react-native-reanimated'
import { PlantProps, savePlant } from '../libs/storage'

interface Params{
    plant:PlantProps;
}

export function PlantSave(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')


    const route = useRoute();
    //--Usar quanod o Json estiver funcionando
    const {plant} = route.params as Params;
    //{plant.name}
    //{plant.about}
    //{plant.water_tips}

    const navigation = useNavigation();

    
    async function handleSave(){
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime

            });

            navigation.navigate("Confirmation", {
                title: "Tudo certo!",
                subtitle: "Fique tranquilo sempre lembrar você de cuidar da sua plantinha com muito cuidado.",
                buttonTitle: "Muito Obrigado :D",
                icon: 'hug',
                nextScreen: "MyPlants"
            })
        }catch{
            Alert.alert('Não foi possivel salvar. 😥')
        }
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => ! oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro! ⏰")
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePicketForAndroid(){
        setShowDatePicker(oldState => !oldState)
    }

//ScrollView adapta a tela a diferentes celulares
    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle = {styles.container}
        >
            <View style = {styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri =''
                        //uri ={plant.photo}
                        height = {150}
                        width = {150}
                    />

                    <Text style={styles.plantName} >
                        Nome da planta
                        
                    </Text>
                    <Text style={styles.plantAbout}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut aliquam eveniet fuga obcaecati sunt, 
                        animi facere ducimus
                        
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, 
                            voluptatum at. Blanditiis doloremque 
                            
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horario para ser lembrado:
                    </Text>

                    {showDatePicker && ( 
                        <DateTimePicker
                            value={selectedDateTime}
                            mode = 'time'
                            display = 'spinner'
                            onChange = {handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS == 'android' &&(
                            <TouchableOpacity 
                                style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimePicketForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )                   
                    }

                    <Button
                        title = "Cadastrar Planta"
                        onPress = {handleSave}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape

    },
    plantInfo:{
        flex:1,
        paddingHorizontal:20,
        paddingVertical:50,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: colors.shape
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop:20,
        paddingBottom: getBottomSpace() || 20
    }, 
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        margin: 15
    }, 
    plantAbout:{
        textAlign:'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        margin: 10
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20, 
        borderRadius: 20, 
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width:56,
        height:56
    }, 
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue, 
        fontSize: 17,
        textAlign:'center'
    }, 
    alertLabel:{
        textAlign:'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize:12,
        marginBottom:5
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical:40,
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
})