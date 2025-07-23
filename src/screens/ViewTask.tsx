import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Task } from '../types'; // adjust path

const ViewTaskScreen = () => {
  const route = useRoute<RouteProp<{ params: { task: Task } }, 'params'>>();
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      {/* <Text style={styles.priority}>Priority: {task.priority}</Text>
      <Text style={styles.status}>Status: {task.completed ? 'Completed' : 'Incomplete'}</Text> */}
    </View>
  );
};

export default ViewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  priority: {
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
  },
});