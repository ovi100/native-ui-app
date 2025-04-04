import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// const DataTable = ({
//   columns,
//   data,
//   isLoading,
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   onPageChange,
// }) => {
//   return (
//     <View style={styles.container}>
//       {/* Table Header */}
//       <View style={styles.headerRow}>
//         {columns.map((column, index) => (
//           <Text key={index} style={[styles.headerCell, { flex: column.flex || 1 }]}>
//             {column.header}
//           </Text>
//         ))}
//       </View>

//       {/* Table Body */}
//       {isLoading ? (
//         <ActivityIndicator size="large" style={styles.loader} />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.row}>
//               {columns.map((column, colIndex) => (
//                 <Text key={colIndex} style={[styles.cell, { flex: column.flex || 1 }]}>
//                   {item[column.accessor]}
//                 </Text>
//               ))}
//             </View>
//           )}
//           ListEmptyComponent={
//             <Text style={styles.noDataText}>No data available</Text>
//           }
//         />
//       )}

//       {/* Pagination */}
//       {!isLoading && (
//         <View style={styles.pagination}>
//           <TouchableOpacity
//             onPress={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1 || isLoading}
//             style={[styles.pageButton, (currentPage === 1 || isLoading) && styles.disabledButton]}
//           >
//             <Text style={styles.pageButtonText}>Previous</Text>
//           </TouchableOpacity>

//           <Text style={styles.pageInfo}>
//             {currentPage > 1 ? itemsPerPage + 1 : currentPage}-{currentPage > 1 ? itemsPerPage * 2 : itemsPerPage} of {Math.ceil(totalItems / itemsPerPage)}
//           </Text>

//           <TouchableOpacity
//             onPress={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === Math.ceil(totalItems / itemsPerPage) || isLoading}
//             style={[styles.pageButton, (currentPage === Math.ceil(totalItems / itemsPerPage) || isLoading) && styles.disabledButton]}
//           >
//             <Text style={styles.pageButtonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

const DataTable = ({
  columns,
  data,
  isLoading = false,
  pagination = false,
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  headerStyle = {},
  rowStyle = {},
  cellStyle = {},
  loadingComponent,
  emptyComponent,
}) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={[styles.headerRow, headerStyle]}>
        {columns.map((column, index) => (
          <Text
            key={index}
            style={[
              styles.headerCell,
              { flex: column.flex || 1 },
              column.headerStyle,
            ]}
          >
            {column.header}
          </Text>
        ))}
      </View>

      {/* Table Body */}
      {isLoading ? (
        loadingComponent || <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={data}
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
                  {column.render ? column.render(item) : item[column.accessor]}
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
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            style={[
              styles.pageButton,
              (currentPage === 1 || isLoading) && styles.disabledButton,
            ]}
          >
            {/* <Text style={styles.pageButtonText}>Previous</Text> */}
            <View style={[styles.icon,styles.iconPrev]} />
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            {/* Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)} */}
            {currentPage > 1 ? (itemsPerPage * currentPage) - ((itemsPerPage - currentPage) + 1) : currentPage}-{itemsPerPage * currentPage} of {Math.ceil(totalItems / itemsPerPage)}
          </Text>
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
            {/* <Text style={styles.pageButtonText}>Next</Text> */}
            <View style={[styles.icon,styles.iconNext]} />
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
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  pageButtonText: {
    color: 'white',
  },
  pageInfo: {
    color: '#666',
  },
  icon: {
    width: 10,
    height: 10,
    borderColor: '#fff',
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
