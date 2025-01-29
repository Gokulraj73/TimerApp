import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e669c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  sectionHeaderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  bulkActionButton: {
    backgroundColor: '#6200ee',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  bulkActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonView: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#2c73a7',
    borderRadius: 5
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  bottomButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
});
