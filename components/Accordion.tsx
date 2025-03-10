import React, {useState} from 'react';
import type {JSX, PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionPros = PropsWithChildren<{
  title: string;
}>;

function Accordion({children, title}: AccordionPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext(LayoutAnimation.create(2000, 'linear', 'scaleY'));
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        <Text>{expanded ? '➖' : '➕'}</Text>
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    width: '100%',
    padding: 12,
    backgroundColor: '#666',
    color: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  separator: {
    height: 12,
  },
});

export default Accordion;
