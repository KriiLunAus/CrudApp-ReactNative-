import { StyleSheet } from "react-native";

export const indexStyles = (theme, colorScheme) => {
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
      maxHeight: 100,
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