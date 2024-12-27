import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import {StatusBar} from "expo-status-bar"
import { Link } from 'expo-router'
import { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext'
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { indexStyles } from '@/styles/index'


const index = () => {
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);

  const styles = indexStyles(theme, colorScheme);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textAndLink}>
          <Text style={styles.title}>My C.R.U.D. App</Text>
          <Link style={styles.link} href={"/todos"}>Go to Todos</Link>
      </View>
      <Pressable style={styles.switchContainer} onPress={()=> setColorScheme(colorScheme === "dark" ? "light" : "dark")}>
        {/* <Text style={styles.switch}>Switch theme</Text> */}
        <View>
          {colorScheme === "dark"
            ? <Octicons name="moon" size={70} color={theme.moon} />
            : <FontAwesome name="sun-o" size={70} color={theme.sun} />
            }
        </View>

      </Pressable>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default index
