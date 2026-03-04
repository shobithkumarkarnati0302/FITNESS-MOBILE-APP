import { StyleSheet, Text, View, TouchableOpacity, ScrollView,} from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Weight, Calendar, Ruler } from 'lucide-react-native';
import SubscriptionBar from '../components/SubscriptionBar';

const ProfileScreen = ({ navigation }: any) => {
  const { logout, user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>My Profile</Text>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editBtnText}>✎ Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.heroName}>{user?.name}</Text>
          <Text style={styles.heroEmail}>{user?.email}</Text>
          {user?.gender ? (
            <View style={styles.genderBadge}>
              <Text style={styles.genderBadgeText}>
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Body Stats */}
        <Text style={styles.sectionHeading}>Body Stats</Text>
        <View style={styles.statsGrid}>
          {/* Height */}
          <View style={styles.statPill}>
              <Ruler color="#9CA3AF" />
            <Text style={styles.statVal}>
              {user?.height ?? '—'}
              {user?.height ? <Text style={styles.statUnit}> cm</Text> : null}
            </Text>
            <Text style={styles.statLbl}>Height</Text>
          </View>

          {/* Weight */}
          <View style={styles.statPill}>
              <Weight color="#9CA3AF" />
            <Text style={styles.statVal}>
              {user?.weight ?? '—'}
              {user?.weight ? <Text style={styles.statUnit}> kg</Text> : null}
            </Text>
            <Text style={styles.statLbl}>Weight</Text>
          </View>

          {/* Age */}
          <View style={styles.statPill}>
              <Calendar color="#9CA3AF" />
            <Text style={styles.statVal}>
              {user?.age ?? '—'}
              {user?.age ? <Text style={styles.statUnit}> yrs</Text> : null}
            </Text>
            <Text style={styles.statLbl}>Age</Text>
          </View>
        </View>

        {/* Subscription Bar */}
        <Text style = {styles.sectionHeading}>Subscription</Text>
        <View>
          <SubscriptionBar/>
        </View>

        {/* Account Info */}
        <Text style={styles.sectionHeading}>Account</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name ?? '—'}</Text>
          </View>
          <View style={styles.infoSep} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? '—'}</Text>
          </View>
          <View style={styles.infoSep} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={[styles.infoValue, {textTransform: 'capitalize'}]}>{user?.gender ?? '—'}</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={logout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { paddingHorizontal: 16, paddingBottom: 48 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 20,
  },
  topBarTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.3,
  },
  editBtn: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  editBtnText: { color: '#F97316', fontSize: 13, fontWeight: '700' },

  heroCard: {
    backgroundColor: '#F97316',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#F97316',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  heroEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 14 },
  genderBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  genderBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  /* section heading */
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    marginLeft: 4,
  },

  /* stats grid */
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  statPill: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  statVal: { color: '#111827ff', fontSize: 18, fontWeight: '800' },
  statUnit: { color: '#9CA3AF', fontSize: 11, fontWeight: '400' },
  statLbl: {
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  /* info card */
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    paddingHorizontal: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  infoSep: { height: 1, backgroundColor: '#F3F4F6' },
  infoLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  infoValue: { color: '#111827', fontSize: 14, fontWeight: '600' },

  /* logout */
  logoutBtn: {
    backgroundColor: '#fef2f2ff',
    borderWidth: 2,
    borderColor: '#f55a5aff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
