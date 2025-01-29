import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TimerContext } from '../../context/TimerContext';
import Header from '../../components/header/Header';
import { styles } from './styles';

const HistoryScreen: React.FC = () => {
  const { timers } = useContext(TimerContext)!;

  const completedTimers = timers.filter((timer) => timer.status === 'Completed');

  return (
    <View style={styles.container}>
      {completedTimers.length === 0 ? (
        <Text style={styles.placeholder}>No completed timers yet!</Text>
      ) : (
        <FlatList
          data={completedTimers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Completed at: {new Date(Number(item.id)).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};


export default HistoryScreen;
