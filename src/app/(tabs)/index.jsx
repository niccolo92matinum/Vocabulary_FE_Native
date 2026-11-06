import { View, Text , StyleSheet, ImageBackground} from 'react-native'
import React from 'react'
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

import ioImage from "@/assets/images/io.jpg"

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground  
      source={ioImage}
      resizeMode='cover'
      style={styles.image}
      >
        <Text style={styles.text}>
          Sei una merda, hai abbandonato tua figlia
          </Text>
      </ImageBackground>
      
    </View>
  )
}

export default app;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  image:{
    width:"100%",
    height:"100%",
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  },
  text:{
    color:"red",
    fontSize:42,
    fontWeight:600,
    textAlign:"center"
  }
});