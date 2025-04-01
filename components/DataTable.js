import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import SwipeableRow from './SwipeableRow';

const DataTable = ({
  columns,
  initialData,
  refreshing = false,
  onRefresh = () => null,
}) => {
  const [data, setData] = useState(initialData);
  const [order, setOrder] = useState(true);
  const [flatListFooterVisible, setFlatListFooterVisible] = useState(true);

  const handleEndReached = useCallback(() => {
    setFlatListFooterVisible(false);
  }, []);

  const renderFooter = () => (flatListFooterVisible ? <ActivityIndicator /> : null);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const sortData = (column) => {
    setOrder(prev => !prev);
    const sorted = [...data].sort((a, b) => {
      if (!isNaN(a[column]) && !isNaN(b[column])) {
        return order ? a[column] - b[column] : b[column] - a[column];
      } else {
        return order
          ? String(a[column]).localeCompare(String(b[column]))
          : String(b[column]).localeCompare(String(a[column]));
      }
    });
    setData(sorted); // Ensure a new array is assigned
  };

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
        {columns.map((col, index) => (
          <TouchableOpacity key={index} style={styles.headerButton} onPress={() => sortData(col)}>
            <Text style={styles.headerText}>
              {col} {order ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Table Rows */}
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <SwipeableRow item={item} columns={columns} onDelete={handleDelete} />}
        initialNumToRender={10}
        onEndReached={handleEndReached}
        ListFooterComponent={data.length > 10 ? renderFooter : null}
        ListFooterComponentStyle={styles.ListFooterStyle}
        refreshControl={refreshing && onRefresh ? (
          <RefreshControl
            colors={['#fff']}
            onRefresh={onRefresh}
            progressBackgroundColor="#000"
            refreshing={refreshing}
          />
        ) : null}
        // style={{ flex: 1 }}
        // contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  headerButton: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  ListFooterStyle: {
    paddingVertical: 10,
  },
});

export default DataTable;
