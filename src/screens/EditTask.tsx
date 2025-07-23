import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Task } from '../types'; // adjust path

const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { task: Task } }, 'params'>>();

  const [title, setTitle] = useState(route.params.task.title);
  const [description, setDescription] = useState(route.params.task.description);

  const handleSaveEdit = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      let tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];

      tasks = tasks.map(t =>
        t.id === route.params.task.id
          ? { ...t, title, description }
          : t
      );

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.log('Error saving edited task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
        placeholder="Title"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.descriptionInput}
        placeholder="Description"
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    fontSize: 36,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    marginTop:50
  },
  descriptionInput: {
    fontSize: 18,

    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#ffcf01',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});