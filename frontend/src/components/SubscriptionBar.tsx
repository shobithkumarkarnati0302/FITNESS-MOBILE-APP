import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Zap } from 'lucide-react-native';

import { useSelector } from 'react-redux';
import { selectUser } from '../store/selectors/authSelector';

const plans_data = {
  Free: { days: 30 },
  Pro: { days: 60 },
  Elite: { days: 90 },
};

const SubscriptionBar = ({ plan }: { plan: string }) => {

  const user = useSelector(selectUser);

  if (!user) return null;

  const startDate = user?.subscriptionStartDate
    ? new Date(user.subscriptionStartDate)
    : new Date();

  const today = new Date();

  const usedDays = Math.max(
    0,
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const totalDays = plans_data[plan]?.days;
  const progress = Math.min(Math.round((usedDays / totalDays) * 100), 100);
  const remaining = Math.max(0, totalDays - usedDays);

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>{plan.toUpperCase()} PLAN</Text>
          </View>

          <Text style={styles.progressPct}>{progress}%</Text>
        </View>

        <Text style={styles.usedText}>
          {usedDays}/{totalDays} days used
        </Text>
      </View>

      {/* Progress Bar */}
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
  },

  planBadge: {
    backgroundColor: '#F97316',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
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
  },

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
    marginLeft: 8,
  },

  upgradeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 4,
  },

  /* Modal */

  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 9999,
    elevation: 9999,
  },

  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  planItem: {
    paddingVertical: 10,
  },

  planText: {
    fontSize: 16,
    fontWeight: '500',
  },

  closeBtn: {
    marginTop: 15,
    backgroundColor: '#F97316',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
