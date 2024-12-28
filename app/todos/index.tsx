import { Link } from "expo-router";
import { Text, View, TextInput, Pressable, FlatList, Keyboard, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/themeContext";
import {data}  from "../../data/data"
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from "expo-status-bar";
import { todosStyles } from "../../styles/todos"
import Animated, {LinearTransition} from "react-native-reanimated";

type Task = {
  id: string;
  taskName: string;
  completed: boolean;
};


export default function index() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { theme, colorScheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("Todos");
        const todos = jsonData !== null ? JSON.parse(jsonData) : data;

        if (todos && todos.length) {
          setTaskList(todos.sort((a, b) => b.id - a.id))
        } else {
          setTaskList(data.sort((a, b) => b.id - a.id))
        }

      } catch (err) {
        throw new Error(`${err}`);
      }
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    const setStorage = async () => {
      try {

        await AsyncStorage.setItem("Todos", JSON.stringify(taskList));
      } catch (err) {
        throw new Error(`${err}`);
      }
    }
    setStorage()
  },[taskList])

  const styles = todosStyles(theme, colorScheme);

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

        <Animated.FlatList
          data={taskList}
          renderItem={renderItem}
          contentContainerStyle = {styles.tasksContainer}
          keyExtractor={item => item.id}
          keyboardDismissMode="on-drag"
          itemLayoutAnimation={LinearTransition}
      />
       <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </SafeAreaView>
  )
} 