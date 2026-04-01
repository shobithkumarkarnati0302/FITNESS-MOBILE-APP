import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import SubscriptionBar from '../components/SubscriptionBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Weight, Calendar, Ruler, Heart } from 'lucide-react-native';

import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../store/actions/authAction';
import { selectUser } from '../store/selectors/authSelector';

const ProfileScreen = ({ navigation }: any) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const User_Gender = user?.gender
    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
    : '—';

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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
              <Text style={styles.genderBadgeText}>{User_Gender}</Text>
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
              {user?.height ? <Text style={styles.statUnit}> cm</Text> : ''}
            </Text>
            <Text style={styles.statLbl}>Height</Text>
          </View>

          {/* Weight */}
          <View style={styles.statPill}>
            <Weight color="#9CA3AF" />
            <Text style={styles.statVal}>
              {user?.weight ?? '—'}
              {user?.weight ? <Text style={styles.statUnit}> kg</Text> : ''}
            </Text>
            <Text style={styles.statLbl}>Weight</Text>
          </View>

          {/* Age */}
          <View style={styles.statPill}>
            <Calendar color="#9CA3AF" />
            <Text style={styles.statVal}>
              {user?.age ?? '—'}
              {user?.age ? <Text style={styles.statUnit}> yrs</Text> : ''}
            </Text>
            <Text style={styles.statLbl}>Age</Text>
          </View>
        </View>

        {/* Subscription Bar */}
        <Text style={styles.sectionHeading}>Subscription</Text>
        <View>
          <SubscriptionBar plan={user?.plan} />
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
            <Text style={styles.infoValue}>{User_Gender}</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Extras */}
        <View style={styles.extraContainer}>
          <Text style={styles.extraHeading}>Extras</Text>

          {/* Favorites */}
          <TouchableOpacity
            style={[styles.favBtn, { marginBottom: 10 }]}
            onPress={() => navigation.navigate('Favorites')}
            activeOpacity={0.8}
          >
            <Text style={[styles.favText, { color: '#EF4444', marginLeft: 8 }]}>
              My Favorites
            </Text>
          </TouchableOpacity>

          {/* Camera Screen */}
          <TouchableOpacity
            style={styles.extraBtn}
            onPress={() => navigation.navigate('Camera')}
            activeOpacity={0.8}
          >
            <Text style={styles.extraText}>Go To Camera Page</Text>
          </TouchableOpacity>
        </View>
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

  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    marginLeft: 4,
  },

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
  statVal: { color: '#111827', fontSize: 18, fontWeight: '800' },
  statUnit: { color: '#9CA3AF', fontSize: 11, fontWeight: '400' },
  statLbl: {
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

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

  logoutBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#F87171',
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

  extraContainer: {
    marginTop: 20,
  },
  extraHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    marginLeft: 4,
  },
  favBtn:{
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#F87171',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  favText:{
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  extraBtn: {
    backgroundColor: '#FFF7ED',
    borderWidth: 2,
    borderColor: '#F97316',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  extraText: {
    color: '#F97316',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
