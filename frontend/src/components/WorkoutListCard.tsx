import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const DIFFICULTY_COLORS = {
  beginner: '#22C55E',
  intermediate: '#F59E0B',
  expert: '#EF4444',
};

const TYPE_COLORS = {
  strength: { bg: '#EFF6FF', text: '#2563EB' },
  cardio: { bg: '#FFF7ED', text: '#EA580C' },
  stretching: { bg: '#F0FDF4', text: '#16A34A' },
  plyometrics: { bg: '#FDF4FF', text: '#9333EA' },
  powerlifting: { bg: '#FFF1F2', text: '#E11D48' },
  'olympic weightlifting': { bg: '#F0FEFF', text: '#0891B2' },
};

const WorkoutListCard = ({ exercise, navigation }) => {
  const difficultyColor = DIFFICULTY_COLORS[exercise.difficulty] ?? '#EF4444';

  const typeStyle = TYPE_COLORS[exercise.type?.toLowerCase()] ?? {
    bg: '#F3F4F6',
    text: '#6B7280',
  };

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <View style={[styles.accent, { backgroundColor: difficultyColor }]} />

      {/* Left Column */}
      <View style={styles.body}>
        {/*  Exercise Name */}
        <Text style={styles.name} numberOfLines={2}>
          {exercise.name}
        </Text>

        {/*  Type */}
        <View style={[styles.typeBox, { backgroundColor: typeStyle.bg }]}>
          <Text style={[styles.typeText, { color: typeStyle.text }]}>
            {exercise.type}
          </Text>
        </View>

        {/*  Equipments*/}
        <View style={styles.equipRow}>
          {exercise.equipments.length > 0 && (
            <>
              <Text style={styles.equipTextHeading}>Equipments Required:</Text>
              {exercise.equipments.map((eq, i) => (
                <View key={i} style={styles.equipTag}>
                  <Text style={styles.equipText}>{eq}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>

      {/* Right column*/}
      <View style={styles.right}>
        {/* Difficulty Badge */}
        <View style={[styles.diffBadge, { backgroundColor: difficultyColor }]}>
          <Text style={styles.diffText}>{exercise.difficulty}</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nxtBox, { borderColor: difficultyColor }]}
          onPress={() => navigation.navigate('WorkoutDetail', { exercise })}
        >
          <ChevronRight size={18} color={difficultyColor} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutListCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: 'hidden',
  },

  accent: {
    width: 5,
  },

  body: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 8,
    gap: 8,
  },

  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 20,
  },

  typeBox: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  equipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  equipTextHeading: {
    fontSize: 9,
    fontWeight: '700',
    color: '#F97316',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  equipTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },
  equipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },

  right: {
    paddingVertical: 16,
    paddingRight: 14,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  diffText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },

  nxtBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
});
