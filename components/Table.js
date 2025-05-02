import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Table = ({
  columns,
  fetchUrl,
  itemsPerPage = 10,
  pagination = false,
}) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchData = useCallback(async (newSkip = 0, refresh = false) => {
    if (!fetchUrl) { return; }

    if (refresh) { setIsRefreshing(true); }
    else { setIsLoading(true); }

    try {
      const response = await fetch(
        `${fetchUrl}?limit=${itemsPerPage}&skip=${newSkip}`
      );
      const json = await response.json();

      if (pagination || refresh || newSkip === 0) {
        setData(json.users || []);
      } else {
        setData(prev => [...prev, ...(json.users || [])]);
      }

      setTotal(json.total || 0);
      setSkip(newSkip);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
      setIsFirstLoad(false);
    }
  }, [fetchUrl, itemsPerPage, pagination]);


  useEffect(() => {
    setSkip(0);
    setIsFirstLoad(true);
    fetchData(0, true);
  }, [fetchData]);

  const onRefresh = () => fetchData(0, true);

  const onNext = () => {
    if (skip + itemsPerPage < total) {
      fetchData(skip + itemsPerPage);
    }
  };

  const onPrev = () => {
    if (skip - itemsPerPage >= 0) {
      fetchData(skip - itemsPerPage);
    }
  };

  const onEndReached = () => {
    if (!pagination && skip + itemsPerPage < total && !isLoading) {
      fetchData(skip + itemsPerPage);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map(col => (
        <Text key={col.key} style={[styles.headerCell, { flex: col.flex }]}>
          {col.title}
        </Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {columns.map(col => (
        <Text key={col.key} style={[styles.cell, { flex: col.flex }]}>
          {item[col.key]}
        </Text>
      ))}
    </View>
  );

  const renderLoader = () =>
    !pagination && isLoading ? (
      <View style={{ paddingVertical: 10 }}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;

  const renderPaginationControls = () => {
    if (!pagination) { return null; }

    const totalPages = Math.ceil(total / itemsPerPage);
    const currentPage = Math.floor(skip / itemsPerPage) + 1;

    return (
      <View style={styles.paginationControls}>
        <TouchableOpacity
          style={[
            styles.button,
            skip === 0 && styles.disabledButton,
          ]}
          onPress={onPrev}
          disabled={skip === 0}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            skip + itemsPerPage >= total && styles.disabledButton,
          ]}
          onPress={onNext}
          disabled={skip + itemsPerPage >= total}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isFirstLoad && isLoading) {
    return (
      <View style={styles.fullScreenLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        onEndReached={pagination ? null : onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      {renderPaginationControls()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  cell: {
    color: '#333',
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
  pageIndicator: {
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Table;
