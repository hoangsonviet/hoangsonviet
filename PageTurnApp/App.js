import React, { useRef, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import PageScreen from './components/PageScreen';
import { pages } from './data/pages';

const { height } = Dimensions.get('window');

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <View style={styles.container}>
      <ExpoStatusBar hidden />

      {/* Full-screen vertical page list with snap-to-page */}
      <FlatList
        data={pages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PageScreen page={item} />}
        // Core behavior: disable free scroll, snap to each page
        pagingEnabled
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        decelerationRate="fast"
        // Pre-compute item positions so FlatList doesn't need to measure
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />

      {/* Vertical dot indicator on the right */}
      <View style={styles.dots}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: currentIndex === index ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>

      {/* Page counter in bottom-left */}
      <Text style={styles.counter}>
        {currentIndex + 1} / {pages.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // Dots sit on the right edge, centered vertically
  dots: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginVertical: 4,
  },
  counter: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    fontWeight: '600',
  },
});
