import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext'
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const index = () => {
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textAndLink}>
          <Text style={styles.title}>My C.R.U.D. App</Text>
          <Link style={styles.link} href={"/todos"}>Go to Todos</Link>
      </View>
      <Pressable style={styles.switchContainer} onPress={()=> setColorScheme(colorScheme === "dark" ? "light" : "dark")}>
        <Text style={styles.switch}>Switch theme</Text>
        <View>
          {colorScheme === "dark"
            ? <Octicons name="moon" size={70} color={theme.text} />
            : <FontAwesome name="sun-o" size={70} color={theme.text} />
            }
        </View>

      </Pressable>
     
    </SafeAreaView>
  )
}

export default index

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
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
      color: theme.text
    },
    link: {
      padding: 15,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 10,

      color: theme.text,
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
      borderColor: theme.border,
      borderRadius: 10,
    
      fontSize: 20,
      color: theme.text,
    }
  })
}