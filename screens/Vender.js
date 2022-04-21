import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Button, TextInput, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'

import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'
const db = getFirestore(appFirebase)

const Vender = (props) => {

    const objetoComida = {
        nombre:'',
        precio:'',
        imagen:''
    }


    const [loaging, setLoading] = useState(true)
    const [comida, setComida] = useState(objetoComida)
    const [cantidad, setCantidad] = useState('')
    const [montoTotal, setMontototal] = useState(0)
       //const  montoTotal = parseInt(comida.precio) * parseInt(cantidad);

    const monto = (cantidad)=>{
        setCantidad(cantidad);
        setMontototal(parseInt(comida.precio) * parseInt(cantidad))
    }   

    const getOneComida = async(id)=>{
        try {
            const docRef = doc(db, 'comidas', id)
            const docSnap = await getDoc(docRef)
            setComida(docSnap.data())
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        getOneComida(props.route.params.comidaId);
    },[])

    const realizarVenta = async()=>{
      try {
        const newVenta = {
          nombre: comida.nombre,
          precio: comida.precio,
          cantidad: cantidad,
          montoTotal: montoTotal
        }

        await addDoc(collection(db,'ventas'),{
          ...newVenta
        })

        Alert.alert('Accion completa', 'Venta realizada con exito')

        props.navigation.navigate('Comidas')

      } catch (error) {
        console.log(error)
      }
    }

    if(loaging){
        return(
            <View>
                <ActivityIndicator size={'large'} color={'#9e9e9e'} style={{marginTop:200}} />
            </View>
        )
    }

  return (
    <ScrollView>
      <View style={styles.card}>
        <Image source={{ uri: comida.imagen }} style={styles.imagen} />
          <Text style={styles.nombre}>Nombre: {comida.nombre}</Text>
          <Text style={styles.precio}>Precio: {comida.precio}$</Text>
          <View style={styles.cantidad} >
            <Text style={styles.precio}>Cantidad: </Text>
            <TextInput placeholder='ingresar la cantidad'keyboardType='number-pad' style={styles.inputCantidad} 
             onChangeText={(text)=>monto(text)} />
          </View>
          <Text style={styles.monto}>Monto Total: {montoTotal}</Text>
          <Button title='Realizar Venta' color='#E89A5F' onPress={realizarVenta} />
      </View>
    </ScrollView>
  );
}

export default Vender

const styles = StyleSheet.create({
    imagen: {
        width: "100%",
        height: 300,
      },
      nombre: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
      },
      precio: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
      },
      cantidad:{
          marginTop:5,
          flex:1,
         justifyContent:'center',
         alignItems:'center'

      },
      inputCantidad:{
          borderWidth:1,
          width:250,
        height:40,
        textAlign:'center',
        borderRadius:5,
        borderColor:'#9e9e9e',
        marginTop:3
      },
      monto:{
          marginTop:10,
          fontSize: 16,
          fontWeight: "400",
          textAlign: "center",
          marginBottom:10
      },
      card: {
        padding: 10,
        marginBottom: 10,
        
      },
})