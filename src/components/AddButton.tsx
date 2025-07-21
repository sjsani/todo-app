import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface AddButtonProps {
  onPress?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={()=>{
      console.log("111")
    }

    }>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ffcf01',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  plus: {
    fontSize: 30,
    color: 'black',
  },
});
