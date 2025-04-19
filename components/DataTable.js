import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import Dropdown from './Dropdown';

const DataTable = ({
  columns,
  data,
  isLoading = false,
  pagination = false,
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  color = '#cacaca',
  rowStyle = {},
  cellStyle = {},
  loadingComponent,
  emptyComponent,
}) => {
  const [searchText, setSearchText] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);


  const handlePageChange = useCallback((option) => {
    onPageChange(option.value);
  }, [onPageChange]);

  const filteredData = useMemo(() => {
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key];
        return typeof val === 'string' || typeof val === 'number'
          ? val.toString().toLowerCase().includes(searchText.toLowerCase())
          : false;
      })
    );
  }, [data, columns, searchText]);

  const sortedData = useMemo(() => {
    if (!sortKey) { return filteredData; }
    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) { return sortAsc ? -1 : 1; }
      if (a[sortKey] > b[sortKey]) { return sortAsc ? 1 : -1; }
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  const toggleSort = key => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: color }]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#979797"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {/* Table Header */}
      <View style={[styles.headerRow]}>
        {columns.map((column) => (
          <TouchableOpacity
            key={column.key}
            onPress={() => column.key && toggleSort(column.key)}
            style={[{ flex: column.flex || 1 }, column.headerStyle]}
          >
            <Text style={styles.headerCell}>
              {column.title}
              {sortKey === column.key ? (sortAsc ? ' ↑' : ' ↓') : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Table Body */}
      {isLoading ? (
        loadingComponent || <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={[styles.row, rowStyle]}>
              {columns.map((column, colIndex) => (
                <Text
                  key={colIndex}
                  style={[
                    styles.cell,
                    { flex: column.flex || 1 },
                    cellStyle,
                    column.cellStyle,
                  ]}
                >
                  {column.render ? column.render(item) : item[column.key]}
                </Text>
              ))}
            </View>
          )}
          ListEmptyComponent={
            emptyComponent || <Text style={styles.noDataText}>No data available</Text>
          }
        />
      )}

      {/* Pagination */}
      {!isLoading && pagination && (
        <View style={[styles.pagination, { backgroundColor: color }]}>
          <TouchableOpacity
            onPress={() => onPageChange(1)}
            disabled={currentPage === 1}
            style={[
              styles.pageButton,
              (currentPage === 1) && styles.disabledButton,
            ]}
          >
            <View style={[styles.icon, styles.iconPrev]} />
            <View style={[styles.icon, styles.iconPrev]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={[
              styles.pageButton,
              (currentPage === 1) && styles.disabledButton,
            ]}
          >
            <View style={[styles.icon, styles.iconPrev]} />
          </TouchableOpacity>
          {/* <Text style={styles.pageInfo}>
            Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
          </Text> */}
          <Dropdown
            options={Array.from({ length: totalItems / itemsPerPage }, (_, i) => String(i + 1))}
            onChange={handlePageChange}
            placeholder="Page"
            position="top"
            elevation={1}
            dropdownStyle={{
              button: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 5,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 5,
              },
              text: { fontSize: 12, textAlign: 'center' },
              icon: {
                width: 7,
                height: 7,
                borderColor: '#333',
                borderBottomWidth: 2,
                borderRightWidth: 2,
              },
            }}
          />
          <TouchableOpacity
            onPress={() => onPageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(totalItems / itemsPerPage) ||
              isLoading ||
              data.length < itemsPerPage
            }
            style={[
              styles.pageButton,
              (currentPage === Math.ceil(totalItems / itemsPerPage) || isLoading) &&
              styles.disabledButton,
            ]}
          >
            <View style={[styles.icon, styles.iconNext]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPageChange(totalItems / itemsPerPage)}
            disabled={currentPage === totalItems / itemsPerPage}
            style={[
              styles.pageButton,
              (currentPage === totalItems / itemsPerPage) && styles.disabledButton,
            ]}
          >
            <View style={[styles.icon, styles.iconNext]} />
            <View style={[styles.icon, styles.iconNext]} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // borderRadius: 8,
    overflow: 'hidden',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  cell: {
    textAlign: 'center',
    color: '#333',
  },
  loader: {
    marginVertical: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    padding: 10,
  },
  pageButton: {
    width: 40,
    // height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  disabledButton: {
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  pageButtonText: {
    color: 'white',
  },
  pageInfo: {
    color: '#666',
  },
  firstPage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 10,
    height: 10,
    borderColor: '#000',
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  iconPrev: {
    transform: [{ rotate: '135deg' }],
  },
  iconNext: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default DataTable;
