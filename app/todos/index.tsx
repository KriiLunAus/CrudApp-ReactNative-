import { Link } from "expo-router";
import { Text, View, TextInput, Pressable, FlatList, Keyboard, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import {data}  from "../../data/data"
import Feather from '@expo/vector-icons/Feather';


export default function index() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskList, setTaskList] = useState(data.sort((a,b) => b.id - a.id));
  const { theme, colorScheme } = useContext(ThemeContext);

  const styles = createStyles(theme, colorScheme);

  const onSubmit = () => {
    let id = Math.random().toString(16).slice(2);
    
    if (taskTitle !== '') { 
      const task = {
        id: id.toString(),
        taskName: taskTitle,
        completed: false,
      }
      setTaskList((initialTasks) => [task, ...initialTasks])
      setTaskTitle('')
      Keyboard.dismiss();
    }
  }

  const onRemove = (id: string) => {
    const tasks = taskList.filter((item) => item.id !== id);
    setTaskList(tasks)
  }

  const onComplete = (id:string) => {
    const completed = taskList.map((task) => {
      if (task.id === id) {
        return {...task, completed: !task.completed,};
      }
      return task
    })
    setTaskList(completed)
  }

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <Text onPress={() => onComplete(item.id)} style={[styles.taskTitle, item.completed === true ? styles.completed : '']}>
        {item.taskName}</Text>
      <Pressable onPress={()=>{onRemove(item.id)}}>
        <Text style={styles.removeBtn}>Remove</Text>
      </Pressable>
    </View>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
      <Link href='/'>
        <Feather name="arrow-left-circle" size={40} color={theme.text} style={{pointerEvents: 'auto'}} />
      </Link>
        <TextInput
          placeholder="Type your task"
          placeholderTextColor="gray"
          style={styles.input}
          value={taskTitle}
          onChangeText={(text => setTaskTitle(text) )}
          onSubmitEditing={onSubmit} />
        <Pressable onPress={onSubmit} >
          <Text style={styles.addBtn}>Add</Text>
          </Pressable>
      </View>

        <FlatList
          data={taskList}
          renderItem={renderItem}
          contentContainerStyle = {styles.tasksContainer}
          keyExtractor={item => item.id}
          keyboardDismissMode= "on-drag"
          />
      </SafeAreaView>
  )
} 

function createStyles(theme, colorScheme) {
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
    marginLeft: 10,
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