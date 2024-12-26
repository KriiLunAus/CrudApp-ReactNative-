import { StyleSheet, Appearance } from "react-native";
import { Colors } from "@/constants/Colors";


export function createStyles() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
    StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 10,
},
tasksContainer: {
    padding: 10,
    gap: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto'
},
task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
taskTitle: {
    color: theme.text,
    width: '72%',
    textAlignVertical: 'center',
    fontSize: 18,
    pointerEvents: 'auto'

},
form: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    padding: 3,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto'
},
input: {
    width: '80%',
    height: 50,
    padding: 5,

    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    borderColor: theme.border,
    color: theme.text,
    marginLeft: 15,
    marginRight: 15,
    pointerEvents: 'auto'
},
addBtn: {
    width: 120,
    height: 50,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',

    borderWidth: 2,
    borderColor: theme.border,
    color: theme.text,
    backgroundColor: theme.background,
    pointerEvents: 'auto'
},
removeBtn: {
    width: 100,
    height: 40,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',

    fontSize: 18,
    color: theme.text,

    borderWidth: 2,
    borderColor: theme.border,
    backgroundColor: theme.background,
    pointerEvents: 'auto'
},
completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
        }
}))
}