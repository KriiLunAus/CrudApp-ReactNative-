import { Link } from "expo-router";
import { Text, View, TextInput, Pressable, FlatList, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {data}  from "../../data/data"
import { createStyles } from "@/functions/todos-styles";
import Feather from '@expo/vector-icons/Feather';
const styles = createStyles();


export default function index() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskList, setTaskList] = useState(data.sort((a,b) => b.id - a.id));

  
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
        <Feather name="arrow-left-circle" size={40} color="white" style={{pointerEvents: 'auto'}} />
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