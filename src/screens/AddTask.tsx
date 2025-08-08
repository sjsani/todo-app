import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Task } from '../types'; // adjust path if needed
import { Picker } from '@react-native-picker/picker';
import BackButton from '../components/BackButton';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
    };

    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      console.log('Task saved successfully');
      navigation.goBack(); // navigate back to Home screen
    } catch (error) {
      console.log('Error saving task:', error);
    }
  };
return(
  <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.headerText}>New Task</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Add Button */}

    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffcf01',
    paddingVertical: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems:'center',
    borderBottomLeftRadius:100,
    borderBottomRightRadius:100,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginBottom:20,
  },
  addButton: {
    backgroundColor: '#ffcf01',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius:45,
    borderBottomRightRadius:45,
    borderTopLeftRadius:45,
    borderTopRightRadius:45,
  },
  addButtonText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'black',
  },
});