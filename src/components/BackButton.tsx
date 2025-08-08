import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                top: 70,
                left: 30,
                zIndex: 1,
              }}
            >
              <Ionicons name="arrow-back" size={36} color="black" />
            </TouchableOpacity>

  );
};

export default BackButton;

const styles = StyleSheet.create({
    BackButton:{
    top:10,
    left:10,
  }

})