import {Text, View} from 'react-native';

const accordionStyle = {color: '#fff', fontSize: 14};

const accordions = [
  {
    title: 'Accordion 1',
    content: (
      <View>
        <Text style={accordionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    ),
  },
  {
    title: 'Accordion 2',
    content: (
      <View>
        <Text style={accordionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    ),
  },
  {
    title: 'Accordion 2',
    content: (
      <View>
        <Text style={accordionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    ),
  },
];

const tabs = [
  {
    title: 'Tab 1',
    content: (
      <View className="mt-5">
        <Text className="text-lg">Content for Tab 1</Text>
      </View>
    ),
  },
  {
    title: 'Tab 2',
    content: (
      <View className="mt-5">
        <Text className="text-lg">Content for Tab 2</Text>
      </View>
    ),
  },
  {
    title: 'Tab 3',
    content: (
      <View className="mt-5">
        <Text className="text-lg">Content for Tab 3</Text>
      </View>
    ),
  },
];

export {accordions, tabs};
