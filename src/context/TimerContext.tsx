import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerContextProps } from './types'

export const TimerContext = createContext<TimerContextProps | null>(null);

export const TimerProvider: React.FC = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  useEffect(() => {
    const loadTimers = async () => {
      const savedTimers = await AsyncStorage.getItem('timers');
      if (savedTimers) setTimers(JSON.parse(savedTimers));
    };
    loadTimers();
  }, []);

  const saveTimers = async (newTimers: Timer[]) => {
    setTimers(newTimers);
    await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
  };

  const addTimer = (timer: Timer) => saveTimers([...timers, timer]);

  const updateTimer = (id: string, updates: Partial<Timer>) => {
    const updatedTimers = timers.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    saveTimers(updatedTimers);
  };

  const removeTimer = (id: string) => {
    const updatedTimers = timers.filter((t) => t.id !== id);
    saveTimers(updatedTimers);
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, updateTimer, removeTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
