
import React,{useState} from 'react'
import appFirebase from '../credenciales'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(appFirebase)

import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import {BlurView} from 'expo-blur'
import { async } from '@firebase/util';
import { useNavigation } from '@react-navigation/native';


const uri = "https://dam.cocinafacil.com.mx/wp-content/uploads/2020/04/comida-china-tipica.jpg"
const profileImage = 'https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg'

const Login = (props) => {

    //aqui va la logica
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const loguear = async()=>{
        //const navigation = useNavigation();
        
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential)=>{
        //     console.log('Signed in!')
        //     const user = userCredential.user;
        //     console.log(user)
        //     props.navigation.navigate('Home');
        // })
        // .catch(error=>{
        //     console.log(error);
        // })
        
        try {
            await signInWithEmailAndPassword(auth,email,password)
            Alert.alert('iniciando sesion', 'Accediendo...')
            props.navigation.navigate('Home')
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <View style={styles.container}>
      <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}  />
      <ScrollView contentContainerStyle={{
        flex:1,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <BlurView intensity={90}>
          <View style={styles.login}>
            <Image source={{uri: profileImage}} style={styles.profile} />
            <View>
              <Text style={{fontSize:17, fontWeight:'400', color:'white'}} >E-mail</Text>
              <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='correo@outlook.com' />
            </View>

            <View>
              <Text style={{fontSize:17, fontWeight:'400', color:'white'}} >Password</Text>
              <TextInput onChangeText={(text)=>setPassword(text)} style={styles.input} placeholder='password' secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.button} onPress={loguear}>
              <Text style={{fontSize:17, fontWeight:'400', color:'white'}} >Login</Text>
            </TouchableOpacity>

          </View>
        </BlurView>
      </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
      },
      login:{
        width:350,
        height:500,
        borderColor:'white',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        alignItems:'center'
      },
      profile:{
        width:100,
        height:100,
        borderRadius:50,
        borderColor:'white',
        borderWidth:1,
        marginVertical:30
      },
      input:{
        width:250,
        height:40,
        borderColor:'white',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        marginVertical:10,
        backgroundColor:'#ffffff90',
        marginBottom:20
      },
      button:{
        width:250,
        height:40,
        borderRadius:10,
        backgroundColor:'#B2060090',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        borderColor:'white',
        borderWidth:1
      }
})