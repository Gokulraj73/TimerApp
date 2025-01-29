import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TimerContext } from '../../context/TimerContext';
import { Picker } from '@react-native-picker/picker'
import { styles } from './styles';

const AddTimerScreen: React.FC = ({ navigation }) => {
  const { addTimer } = useContext(TimerContext);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');

  const handleSave = () => {
    const timer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      category,
      status: 'Paused',
      remainingTime: parseInt(duration, 10),
    };

    addTimer(timer);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter timer name"
      />

      <Text style={styles.label}>Duration (in seconds):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Workout" value="Workout" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Break" value="Break" />
      </Picker>
      <TouchableOpacity onPress={handleSave}
        style={styles.buttonView}>
        <Text style={styles.buttonText}>{"Save Timer"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTimerScreen;
