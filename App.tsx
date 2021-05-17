import React, { useEffect } from 'react'
//import { Welcome } from './src/pages/Welcome'
import {PlantSelect} from './src/pages/PlantSelect'

import {useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import * Notifications from  'expo-notifications'

import Routes from './src/routes'
import { MyPlants } from './src/pages/MyPlants'
import AuthRouts from './src/routes/tab.routs'
import { PlantSave } from './src/pages/PlantSave'
import { PlantProps } from './src/libs/storage'

export default function App(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(()=>{
   // const subscrition = Notifications.addNotificationReceivedListener(
     // async notification => {
       // const data = notification.request.content.data.plant as PlantProps;
        //console.log(data);
      //});

    //return ()=> subscrition.remove();   

    async function notifications(){
      await Notifications.cancelAllScheduledNotificationsAsync();
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log("Notificações agendadas ##################");
      console.log(data);
    }
  },[])

  //if(fontsLoaded)
   // return <AppLoading />

  return(
      //<Routes/>
      <MyPlants/>

  )
}
