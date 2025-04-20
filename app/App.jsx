import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
import { Button } from 'halka-test';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DataTable from '../components/DataTable';

const { width, height } = Dimensions.get('window');

const App = () => {
  usePermissions();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 15;


  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const columns = [
  //   { title: 'ID', key: 'id', flex: 0.5 },
  //   {
  //     title: 'Name',
  //     flex: 1.5,
  //     render: (item) => `${item.firstName} ${item.lastName}`,
  //   },
  //   { title: 'Age', key: 'age', flex: 0.5 },
  // ];

  const columns = [
    { title: 'ID', key: 'id', flex: 0.5 },
    { title: 'Email', key: 'email', flex: 1.5 },
    { title: 'Age', key: 'age', flex: 0.5 },
  ];


  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const skip = (page - 1) * itemsPerPage;
      const response = await fetch(`https://dummyjson.com/users?limit=${itemsPerPage}&skip=${skip}`);
      const data = await response.json();
      setUsers(data.users);
      setTotalItems(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchProducts = async (page = 1) => {
  //   setIsLoading(true);
  //   try {
  //     const skip = (page - 1) * itemsPerPage;
  //     const response = await fetch(`https://dummyjson.com/product?limit=${itemsPerPage}&skip=${skip}`);
  //     // const response = await fetch('https://dummyjson.com/product?limit=200');
  //     const data = await response.json();
  //     setProducts(data.products);
  //     setTotalItems(data.total);
  //     setCurrentPage(page);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const handleRefresh = async (page) => {
    // await fetchProducts(page);
    await fetchUsers(page);
  };

  // const columns = [
  //   { title: 'ID', key: 'id', flex: 1 },
  //   { title: 'Title', key: 'title', flex: 2 },
  //   { title: 'Price', key: 'price', flex: 1 },
  //   { title: 'Brand', key: 'brand', flex: 1 },
  //   {
  //     title: 'In Stock',
  //     flex: 1,
  //     render: (item) => (
  //       <Text style={{ color: item.stock > 50 ? 'green' : 'orange' }}>
  //         {item.stock}
  //       </Text>
  //     ),
  //   },
  // ];


  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <View className="bg-white flex-1 p-5">
        <View className="data-table flex-1 mt-5">
          {/* <Text className="text-center text-lg font-semibold p-3">Paginated User Table</Text> */}
          {/* <DataTable
            columns={columns}
            data={users}
            isLoading={isLoading}
            pagination={true}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={fetchUsers}
            color="#14b8a6"
          // headerStyle={{ backgroundColor: '#4CAF50' }}
          // rowStyle={{ backgroundColor: '#f9f9f9' }}
          /> */}
          {/* <Text className="text-center text-lg font-semibold p-3">Non-Paginated Product Table</Text> */}
          <DataTable
            columns={columns}
            data={users}
            isLoading={isLoading}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={fetchUsers}
            onRefresh={handleRefresh}
            pagination={false}
          />
        </View>
      </View>
    </GestureHandlerRootView >
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaierExample2: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageExample2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.65636588,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  buttonText: {
    color: '#DAD3C8',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  textExample2: {
    color: '#000000',
    fontSize: 26,
  },
  textPrice: {
    color: '#000000',
    marginVertical: 20,
    fontSize: 16,
  },
});
