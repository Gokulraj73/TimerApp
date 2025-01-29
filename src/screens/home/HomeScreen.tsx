import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { TimerContext } from '../../context/TimerContext';
import TimerCard from '../../components/timer-card/TimerCard';
import Header from '../../components/header/Header';
import { styles } from './styles';

const HomeScreen: React.FC = ({ navigation }) => {
  const { timers, updateTimer } = useContext(TimerContext)!;
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const groupedTimers = timers.reduce((acc: Record<string, any[]>, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const sections = Object.keys(groupedTimers).map((category) => ({
    title: category,
    data: groupedTimers[category],
  }));

  const toggleSection = (title: string) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(title)) {
      newExpandedSections.delete(title);
    } else {
      newExpandedSections.add(title);
    }
    setExpandedSections(newExpandedSections);
  };

  const handleBulkAction = (category: string, action: 'start' | 'pause' | 'reset') => {
    groupedTimers[category].forEach((timer) => {
      switch (action) {
        case 'start':
          if (timer.status !== 'Running') {
            updateTimer(timer.id, { status: 'Running' });
          }
          break;
        case 'pause':
          if (timer.status === 'Running') {
            updateTimer(timer.id, { status: 'Paused' });
          }
          break;
        case 'reset':
          updateTimer(timer.id, { status: 'Paused', remainingTime: timer.duration });
          break;
      }
    });
  };
  return (
    <View style={styles.container}>
      <Header title="Active  Timers" />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) =>
          expandedSections.has(section.title) && <TimerCard {...item} />
        }
        renderSectionHeader={({ section }) => (
          <View>
            <TouchableOpacity
              onPress={() => toggleSection(section.title)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionHeaderText}>
                {section.title} ({section.data.length})
              </Text>
              <Text style={styles.toggleText}>
                {expandedSections.has(section.title) ? '-' : '+'}
              </Text>
            </TouchableOpacity>

            {expandedSections.has(section.title) && (
              <View style={styles.bulkActions}>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => handleBulkAction(section.title, 'start')}
                >
                  <Text style={styles.buttonText}>Start All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => handleBulkAction(section.title, 'pause')}
                >
                  <Text style={styles.buttonText}>Pause All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => handleBulkAction(section.title, 'reset')}
                >
                  <Text style={styles.buttonText}>Reset All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTimer')}
          style={styles.buttonView}
        >
          <Text style={styles.buttonText}>Add Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={styles.buttonView}
        >
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
