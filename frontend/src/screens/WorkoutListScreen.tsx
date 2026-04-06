import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from '../components/Error';
import WorkoutListCard from '../components/WorkoutListCard';
import { ChevronLeft } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutsRequest } from '../store/workoutApi/workoutAction';
import { RootState } from '../store/store';

const WorkoutListScreen = ({ route, navigation }: any) => {
  const muscleGroup = route?.params?.muscleGroup || 'abdominals';
  const dispatch = useDispatch();

  const {
    workouts: exercises,
    loading,
    error,
  } = useSelector((state: RootState) => state.workout);

  useEffect(() => {
    dispatch(fetchWorkoutsRequest(muscleGroup));
  }, [dispatch, muscleGroup]);

  if (loading) return <Loading message="Loading exercises..." />;
  if (error) return <Error message={error} navigation={navigation} />;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerSub}>Exercises for</Text>
          <Text style={styles.headerTitle}>{muscleGroup}</Text>
        </View>

        {/* Count badge */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{exercises.length}</Text>
        </View>
      </View>
      <FlatList
        data={exercises}
        contentContainerStyle={styles.list}
        // ListHeaderComponent={
        //   <View style={styles.header}>
        //     {/* Back button */}
        //     <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        //       <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
        //     </TouchableOpacity>

        //     <View style={styles.headerText}>
        //       <Text style={styles.headerSub}>Exercises for</Text>
        //       <Text style={styles.headerTitle}>{muscleGroup}</Text>
        //     </View>

        //     {/* Count badge */}
        //     <View style={styles.countBadge}>
        //       <Text style={styles.countText}>{exercises.length}</Text>
        //     </View>
        //   </View>
        // }
        renderItem={({ item }) => (
          <WorkoutListCard exercise={item} navigation={navigation} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default WorkoutListScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  list: {
    // paddingBottom: 10,
    paddingTop: 5,
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
    textTransform: 'capitalize',
  },
  countBadge: {
    backgroundColor: '#F97316',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
