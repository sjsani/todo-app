import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused} from '@react-navigation/native';
import { Task } from '../types'; // adjust path
import AddButton from '../components/AddButton';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; // if using Expo
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const HomeScreen = ({  }) => {
  const today = new Date();
  const formattedDate = today.toDateString();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
  const sorted = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  setSortedTasks(sorted);
}, [tasks]);
  useEffect(() => {
    const loadTasks = async () => {
  try {
    const tasksJson = await AsyncStorage.getItem('tasks');
    let loadedTasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];


    loadedTasks.sort((a, b) => {

      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }


      const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setTasks(loadedTasks);
  } catch (error) {
    console.log('Error loading tasks:', error);
  }
};
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);
const handleViewTask = (task: Task) => {
  navigation.navigate('ViewTask', { task });
};

const handleEditTask = (task: Task) => {
  navigation.navigate('EditTask', { task });
  // Navigate to edit task screen if implemented
};

const handleDeleteTask = async (id: string) => {
  try {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  } catch (error) {
    console.log('Error deleting task:', error);
  }
};
const handleToggleComplete = async (task: Task) => {
  try {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  } catch (error) {
    console.log('Error toggling completion:', error);
  }
};
 const renderItem = ({ item }: { item: Task }) => (
  <View style={[styles.taskItem, item.completed && styles.completedTask]}>
    <View style={styles.taskInfo}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDetail}>Priority: {item.priority}</Text>
      <Text style={styles.taskDetail}>Status: {item.completed ? 'Completed' : 'Incomplete'}</Text>
    </View>

    <View style={styles.taskActions}>
      <TouchableOpacity onPress={() => handleToggleComplete(item)}>
        <Ionicons
          name={item.completed ? "close-circle-outline" :"checkmark-circle-outline" }
          size={24}
          color={item.completed ? "red" : "green"}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleViewTask(item)}>
        <Ionicons name="eye" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditTask(item)}>
        <Ionicons name="pencil" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>



      <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
        <Ionicons name="trash" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={[styles.container,]}>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Tasks</Text>
          <Text style={styles.headerDate}>{formattedDate}</Text>
        </View>
        <Text style={styles.taskCount}>{tasks.length}</Text>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks made</Text>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <AddButton />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop:65},
  header: {
    backgroundColor: '#ffcf01',
    paddingVertical: 30,
    justifyContent: 'center',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    marginLeft:20,
    marginRight:20,
  },
  headerText: { fontSize: 28, fontWeight: 'bold', color: 'black',    left:20,
    },
  noTasksText: { textAlign: 'center', marginTop: 50, color: 'grey' },
  listContent: { padding: 20 },

  completedTask: { backgroundColor: 'lightgreen' },
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskDetail: { fontSize: 14, color: 'black' },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'yellow',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: { fontSize: 30, color: 'black' },
  themeButton: {
  position: 'absolute',
  right: 45,
},
taskItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#eee',
  borderRadius: 10,
  padding: 15,
  marginBottom: 15,
},
taskInfo: {
  flex: 1,
},
taskActions: {
  flexDirection: 'row',
  alignItems: 'center',
},
icon: {
  marginLeft: 20,
},
headerDate: {
  fontSize: 18,
  color: 'black',
  left:20,
  fontWeight:'bold',
  top:30,
},
taskCount: {
  fontSize: 36,
  fontWeight: 'bold',
  alignSelf: 'center',
  left:125,
  bottom:35,
  
},
});