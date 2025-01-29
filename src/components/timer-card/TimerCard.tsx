import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { TimerContext } from '../../context/TimerContext';
import ProgressBar from '../progress-bar/ProgressBar';
import { styles } from './styles';
import { TimerCardProps } from './types';

const TimerCard: React.FC<TimerCardProps> = ({ id, name, duration, remainingTime, category, status }) => {
  const { updateTimer, removeTimer } = useContext(TimerContext)!;
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeLeft(remainingTime);
  }, [remainingTime]);

  useEffect(() => {
    if (status === 'Running' && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timeLeft === 0 && status === 'Running') {
      updateTimer(id, { status: 'Completed' });
      setShowModal(true);
    }
  }, [status, timeLeft]);

  const handleStart = () => {
    updateTimer(id, { status: 'Running' });
  };

  const handlePause = () => {
    updateTimer(id, { status: 'Paused' });
  };

  const handleReset = () => {
    updateTimer(id, { status: 'Paused', remainingTime: duration });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>{category}</Text>
      <Text>{formatTime(timeLeft)}</Text>

      <ProgressBar progress={timeLeft / duration} />

      <View style={styles.buttons}>
        {status === 'Running' ? (
          <TouchableOpacity onPress={handlePause} style={styles.buttonView}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          status !== 'Completed' && (
            <TouchableOpacity onPress={handleStart} style={styles.buttonView}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )
        )}
        <TouchableOpacity onPress={handleReset} style={styles.buttonView}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        {status === 'Completed' && (
          <TouchableOpacity onPress={() => removeTimer(id)} style={styles.buttonView}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>🎉 Congratulations! 🎉</Text>
            <Text style={modalStyles.modalMessage}>{name} timer has completed.</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={modalStyles.closeButton}>
              <Text style={modalStyles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TimerCard;
