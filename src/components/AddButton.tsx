import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface AddButtonProps {
  onPress?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AddTask")}

    >
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
