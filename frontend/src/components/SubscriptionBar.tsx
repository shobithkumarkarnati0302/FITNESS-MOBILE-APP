import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Zap } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const TOTAL_DAYS = 30;

const SubscriptionBar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const startDate = new Date(user.subscriptionStartDate);
  const today = new Date();
  const usedDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const progress = Math.round((usedDays / TOTAL_DAYS) * 100);
  const remaining = TOTAL_DAYS - usedDays;

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>FREE PLAN</Text>
          </View>
          <Text style={styles.progressPct}>{progress}%</Text>
        </View>
        <Text style={styles.usedText}>
          {usedDays}/{TOTAL_DAYS} days used
        </Text>
      </View>

      {/* Progress Track */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.remainingText}>
          {remaining} day{remaining !== 1 ? 's' : ''} remaining
        </Text>
        <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8}>
          <Zap size={12} color="#fff" />
          <Text style={styles.upgradeText}>Upgrade</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SubscriptionBar;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 28,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planBadge: {
    backgroundColor: '#F97316',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  planBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressPct: {
    color: '#F97316',
    fontWeight: '800',
    fontSize: 14,
  },
  usedText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },

  /* progress bar */
  track: {
    width: '100%',
    height: 10,
    backgroundColor: '#FED7AA',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  fill: {
    height: 10,
    backgroundColor: '#F97316',
    borderRadius: 6,
  },

  /* bottom row */
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '600',
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  upgradeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
});
