import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {ListItem, Avatar} from '@rneui/themed'
import React,{useState, useEffect} from 'react'

import appFirebase from '../credenciales'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'
const db = getFirestore(appFirebase)

const Ventas = () => {

  const [lista, setLista] = useState([])

  // logica para llamara la lista de documentos de la coleccion proteinas
  useEffect(() => {
      const getLista = async()=>{
          try {
              const querySnapshot = await getDocs(collection(db, 'ventas'))
              const docs = []
              querySnapshot.forEach((doc)=>{
                  const {nombre, precio, cantidad, montoTotal} = doc.data()
                  docs.push({
                      id:doc.id,
                      nombre,
                      precio,
                      cantidad,
                      montoTotal
                  })
              })
              setLista(docs);
          } catch (error) {
              console.log(error);
          }
      }
      getLista()
  }, [])

  return (
    <ScrollView>
      {lista.map((venta)=>(
          <ListItem bottomDivider key={venta.id}>
          <ListItem.Chevron />
          
          <ListItem.Content>
            <ListItem.Title style={styles.titulo}>
              Nombre: {venta.nombre}
            </ListItem.Title>
            <ListItem.Subtitle>Precio: {venta.precio}$ Cantidad: {venta.cantidad} Monto Total: {venta.montoTotal}$</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        ))}
    </ScrollView>
  )
}

export default Ventas

const styles = StyleSheet.create({
  titulo:{
    fontWeight:'bold'
  }
})