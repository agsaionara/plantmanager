import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, PlatformConstants, ActivityIndicator} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import {Header} from  '../components/Header'
import { EnviromentButtonProps } from '../components/EnviromentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

//import planta from '../assets/1.svg'

import api from '../services/api'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'

interface EnviromentProps{
    key: string;
    title: string;
}


export function PlantSelect(){

    const[enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const[plants, setPlants] = useState<PlantProps[]>([]);
    const[filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const[enviromentSelected, setEnviromentSelected] = useState('all');
    const[loading, setLoading] = useState(true);

    const[page, setPage] = useState(1);
    const[loadingMore, setLoadingMore] = useState(false);
    const[loadedAll, setLoadedAll] = useState(false);

    const navegation  = useNavigation();

    function handleEnvorimentoSelected(enviroment: string){
        setEnviromentSelected(enviroment);

        if(enviroment == 'all'){
            return setFilteredPlants(plants);
        }

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const {data} = await api
        .get("plants?_sort=name&_order=asc&=${page}&_limit=8");
        
        if(!data)
            return setLoading(true);
        if(page>1){
            setPlants(oldValue =>[...oldValue, ...data])
            setFilteredPlants(oldValue =>[...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        
        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number){
        if(distance<1){
            return;
        }
        setLoadingMore(true)
        setPage(oldValue => oldValue+1);
        fetchPlants();
    }

    /*function handlePlantSelect(plant: PlantsProps){
        navegation.navigate('PlantSave', {plant})
    }*/

    function handlePlantSelect(){
        navegation.navigate('PlantSave')
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const {data} = await api
            .get("plants_environments?_sort=title&_order=asc");
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }

        fetchEnviroment();
    },[])

    //carreg as informações das plantas
    useEffect(() => {
    },[])
//if(loading){
  //  return <Load/>
//}
    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style ={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style ={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor ={(item) => String(item.key)}
                    renderItem={({item})=>(
                        <EnviromentButtonProps 
                            title={item.title}
                            active={item.key == enviromentSelected}
                            onPress={()=> handleEnvorimentoSelected}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.envorimentList}
                />    
            </View>
                        
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor ={(item) => String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardPrimary 
                            data={item}
                            //onPress={()=> handlePlantSelect()}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => 
                       handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                        ?<ActivityIndicator color={colors.green}/>
                        : <></>
                    }
                />
                <Button 
                title = "Babosa"
                onPress={()=> handlePlantSelect()}
            />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor : colors.background
    }, 
    header:{
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        //fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop:15
    },
    subtitle:{
        fontSize: 17,
        //fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 20,
    },
    envorimentList:{
        height:40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical:32
    }, 
    plants:{
        flex: 1,
        paddingHorizontal:32,
        justifyContent:'center'
    },
    contentContainerStyle:{

    }
})