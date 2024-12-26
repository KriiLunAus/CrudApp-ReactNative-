import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const index = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textAndLink}>
          <Text style={styles.title}>My C.R.U.D. App</Text>
          <Link style={styles.link} href={"/todos"}>Go to Todos</Link>
      </View>
      <Pressable style={styles.switchContainer}>
        <Text style={styles.switch}>Switch theme</Text>
        <View>
          <Octicons name="moon" size={70} color="white" />
          {/* <FontAwesome name="sun-o" size={50} color="white" /> */}
        </View>
      </Pressable>
     
    </SafeAreaView>
  )
}

export default index

const dark = Colors.dark;
const light = Colors.light;

const styles = StyleSheet.create({
  container: {
    backgroundColor: dark.background,
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textAndLink: {
    height: 250,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 40,
    color: dark.text
  },
  link: {
    padding: 15,
    borderWidth: 2,
    borderColor: dark.border,
    borderRadius: 10,

    color: dark.text,
    textAlign: 'center',
    fontSize: 20
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: 50,
  },
  switch: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: dark.border,
    borderRadius: 10,
    
    fontSize: 20,
    color: dark.text,
  }
})