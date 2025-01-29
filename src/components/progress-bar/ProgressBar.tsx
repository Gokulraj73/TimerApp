import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from './styles';
import { ProgressBarProps } from './types'

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressRange = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progressRange * 100}%` }]} />
    </View>
  );
};

export default ProgressBar;
