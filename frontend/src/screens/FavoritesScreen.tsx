import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../store/favorite/favSelector';
import WorkoutListCard from '../components/WorkoutListCard';

const FavoritesScreen = ({ navigation }: any) => {
  const favorites = useSelector(selectFavorites);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerSub}>Your saved</Text>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{favorites?.length ?? 0}</Text>
        </View>
      </View>

      {/* Empty State */}
      {!favorites || favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={48} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart icon on any workout to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <WorkoutListCard exercise={item} navigation={navigation} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerText: {
    flex: 1,
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.1,
  },
  countBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  list: {
    paddingTop: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});
