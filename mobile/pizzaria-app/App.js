import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";


import {FontAwesome} from '@expo/vector-icons'
export default function App() {
const [task, setTask] = useState('')


function handleAdd(){
  alert('ADDDD')
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Digite sua Tarefa..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <FontAwesome name="plus" size={20} color='#fff' />

        
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272e",
    paddingTop: 28,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: '12'
  },

  containerInput:{
      flexDirection: 'row',
      width: '100%',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,

  },

   input:{
    width: '82%',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 5,
    color: '#000',
    backgroundColor: '#DDD'
   },

   buttonAdd: {
    width: '15%',
    height: 44,
    backgroundColor: '#73f',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
   }

})