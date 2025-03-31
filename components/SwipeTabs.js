import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TabBar = ({ tabs, activeTab, onTabChange }) => {
  const indicatorPosition = useSharedValue(activeTab * (width / tabs.length));

  const handleTabPress = (index) => {
    onTabChange(index);
    indicatorPosition.value = withTiming(index * (width / tabs.length), { duration: 200 });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} style={styles.tab} onPress={() => handleTabPress(index)}>
          <Text style={[styles.tabText, activeTab === index && styles.activeText]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
};

const SwipeTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useSharedValue(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
    scrollX.value = withTiming(index * width, { duration: 200 });
  };

  return (
    <View style={{ flex: 1 }}>
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          setActiveTab(Math.round(offsetX / width));
        }}
        scrollEventThrottle={16}
      >
        {tabs.map((tab, index) => (
          <View key={index} style={styles.page}>
            {tab.content}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: '#aaa',
    fontSize: 16,
  },
  activeText: {
    color: '#fff',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: width / 4,
    backgroundColor: '#fff',
  },
  page: {
    width,
  },
});

export default SwipeTabs;
