import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'

import firebaseApp from '../credenciales'


import {getAuth, signOut} from 'firebase/auth'
const auth= getAuth(firebaseApp)

const Home = (props) => {

    const salirSesion = ()=>{
        signOut(auth)
        props.navigation.navigate('Login')
    }


  return (
    <ScrollView>
      <Button title="salir de la sesion" color='#4D3728' onPress={salirSesion} />
      
      <View style={styles.padre}>
            <View>
                <Image style={styles.imagen} source={{uri: 'https://international-experience.es/wp-content/uploads/2019/08/comidas-mundo.jpg'}} />
                <Text style={styles.subtitulo}>Comidas</Text>
                <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('Comidas')} >
                    <Text style={styles.textoBoton}>Consultar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Image style={styles.imagen} source={{uri: 'https://www.espacios.media/wp-content/uploads/2021/10/objetivos-ventas-incrementa-ingresos.jpg'}} />
                <Text style={styles.subtitulo}>Ventas</Text>
                <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('Ventas')} >
                    <Text style={styles.textoBoton}>Consultar</Text>
                </TouchableOpacity>
            </View>
        </View>
      
      </ScrollView>
  );
}

export default Home

const styles = StyleSheet.create({
    titulo:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'400',
        marginTop:20,
        marginBottom:20
    },
    padre:{
        marginTop:120,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    subtitulo:{
        textAlign:'center',
        fontSize:18,
        marginBottom:5,
        marginTop:5,
        fontWeight:'400'
    },
    imagen:{
        height:150,
        width:150,
        borderRadius:5
    },
    boton:{
        backgroundColor:'#E89A5F',
        borderRadius:10
    },
    textoBoton:{
        textAlign:'center',
        color:'white',
        padding:5,
    },
})