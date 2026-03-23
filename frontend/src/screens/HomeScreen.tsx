import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import muscles_groups from '../constants/muscles';
import MuscleCard from '../components/MuscleCard';
import { X, Search } from 'lucide-react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '☀️ Good Morning';
  if (hour < 17) return '🌤️ Good Afternoon';
  return '🌙 Good Evening';
};

const HomeScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.name?.split(' ')[0] ?? 'Athlete';

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(muscles_groups);

  useEffect(() => {
    setFilteredData(muscles_groups);
  }, []);

  const HandleSearch = e => {
    const response = e.toLowerCase();
    setSearch(response);
    const result = muscles_groups.filter(item =>
      item.name.toLowerCase().includes(response.replace(/\s+/g, '').trim()),
    );
    setFilteredData(result);
  };

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={filteredData}
        ListHeaderComponent={
          <>
            {/* Hero card */}
            <View style={styles.heroCard}>
              <View style={styles.heroTop}>
                <View>
                  <Text style={styles.greetingLabel}>{getGreeting()}</Text>
                  <Text style={styles.heroName}>{firstName}!</Text>
                </View>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarLetter}>
                    {firstName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.heroSub}>
                💪 Train smart. Train hard. Every day counts.
              </Text>
            </View>

            {/* Stats pills */}
            <View style={styles.statsRow}>
              <TouchableOpacity style={styles.stat}>
                <Text style={styles.statNum}>{muscles_groups.length}</Text>
                <Text style={styles.statLabel}>Groups</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.stat, styles.statAccent]}>
                <Text style={[styles.statNum, { color: '#fff' }]}>100+</Text>
                <Text
                  style={[
                    styles.statLabel,
                    { color: 'rgba(255,255,255,0.85)' },
                  ]}
                >
                  Exercises
                </Text>
              </TouchableOpacity>
            </View>

            {/* Search bar */}
            <View style={styles.searchBox}>
              <Text style={styles.searchEmoji}>
                <Search />
              </Text>
              <TextInput
                placeholder="Search muscle group..."
                placeholderTextColor="rgba(0,0,0,0.35)"
                style={styles.searchInput}
                value={search}
                onChangeText={HandleSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity
                  style={styles.searchEmoji}
                  onPress={() => {
                    setSearch('');
                    setFilteredData(muscles_groups);
                  }}
                >
                  <X />
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <MuscleCard muscle={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  /* Hero card */
  heroCard: {
    backgroundColor: '#F97316',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 22,
    padding: 22,
    marginBottom: 14,
    shadowColor: '#F97316',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  greetingLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  heroName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F97316',
  },
  searchEmoji: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: '#111827',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 14,
    marginBottom: 18,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statAccent: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  statNum: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F97316',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginHorizontal: 18,
    marginBottom: 10,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 15,
  },
});
