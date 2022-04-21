import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'

import firebaseApp from '../credenciales'
import {getFirestore, getDocs, doc, collection} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

const Comidas = (props) => {
    const [lista, setLista] = useState([])

    // logica para llamara la lista de documentos de la coleccion proteinas
    useEffect(() => {
        const getLista = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, 'comidas'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    const {nombre, precio, imagen} = doc.data()
                    docs.push({
                        id:doc.id,
                        nombre,
                        precio,
                        imagen
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
      {lista.map((comida) => (
        <View key={comida.id} style={styles.card}>
          <Image source={{ uri: comida.imagen }} style={styles.imagen} />
          <Text style={styles.nombre}>{comida.nombre}</Text>
          <Text style={styles.precio}>{comida.precio}$</Text>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => props.navigation.navigate("Vender",{comidaId: comida.id})}
          >
            <Text style={styles.textoBoton}>Consultar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

export default Comidas

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  imagen: {
    width: "100%",
    height: 300,
    borderRadius:5
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth:1,
    borderColor:'gray'
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
  boton: {
    backgroundColor: "#E89A5F",
    borderRadius: 10,
    marginTop:10,
    padding:5
  },
  textoBoton: {
    textAlign: "center",
    color: "white",
    padding: 5,
  },
});