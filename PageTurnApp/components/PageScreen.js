import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PageScreen({ page }) {
  return (
    <View style={[styles.container, { backgroundColor: page.backgroundColor }]}>
      {/* Tag line */}
      <Text style={[styles.tag, { color: page.accentColor }]}>
        {page.tag.toUpperCase()}
      </Text>

      {/* Large emoji icon */}
      <Text style={styles.emoji}>{page.emoji}</Text>

      {/* Title */}
      <Text style={styles.title}>{page.title}</Text>

      {/* Stats grid — shown on page 2 */}
      {page.stats && (
        <View style={styles.statsRow}>
          {page.stats.map((stat, i) => (
            <View key={i} style={styles.statBox}>
              <Text style={[styles.statValue, { color: page.accentColor }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Feature list — shown on page 4 */}
      {page.features && (
        <View style={styles.featureList}>
          {page.features.map((feat, i) => (
            <Text key={i} style={styles.featureItem}>
              {feat}
            </Text>
          ))}
        </View>
      )}

      {/* Body text */}
      {page.body && <Text style={styles.body}>{page.body}</Text>}

      {/* Swipe hint on first page */}
      {page.id === 1 && (
        <View style={styles.hint}>
          <Text style={styles.hintText}>↑ swipe up</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 24,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 44,
  },
  body: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  featureList: {
    width: '100%',
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  hint: {
    position: 'absolute',
    bottom: 48,
  },
  hintText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
  },
});
