import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AddButton from '../components/AddButton';

const Home = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Tasks</Text>
      </View>

      
      <View style={styles.content}>
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>No tasks made</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.taskItem}>{item}</Text>
            )}
          />
        )}
        
      </View>
      <AddButton />
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    paddingLeft: 20,
    paddingRight:20,
  },
  header: {
    backgroundColor: '#ffcf01',
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTasksText: {
    fontSize: 18,
    color: 'grey',
  },
  taskItem: {
    fontSize: 18,
    padding: 10,
  },
});