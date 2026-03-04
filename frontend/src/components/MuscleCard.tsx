import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MuscleCard = ({ muscle, navigation }: any) => {
  const displayName = muscle.name
    .split('_')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      {muscle.id % 2 == 1 ? (
        <TouchableOpacity style={styles.card}activeOpacity={0.85}>
          {/* Muscle image */}
          <Image source={muscle.image} style={styles.image} />

          {/* Right side */}
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.name}>{displayName}</Text>
            </View>
            <Text style={styles.description} numberOfLines={6}>
              {muscle.description}
            </Text>

            {/* View text */}
            <TouchableOpacity
              style={styles.ctaRow}
              onPress={() => navigation.navigate('WorkoutList', { muscleGroup: muscle.name })}
            >
              <Text style={styles.ctaText}>View exercises →</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.card} activeOpacity={0.85}>
          {/* Right side */}
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.name}>{displayName}</Text>
            </View>
            <Text style={styles.description} numberOfLines={6}>
              {muscle.description}
            </Text>

            {/* View text */}
            <TouchableOpacity
              style={styles.ctaRow}
              onPress={() => navigation.navigate('WorkoutList', { muscleGroup: muscle.name })}
            >
              <Text style={styles.ctaText}>View exercises →</Text>
            </TouchableOpacity>
          </View>

          {/* Muscle image */}
          <Image source={muscle.image} style={styles.image} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default MuscleCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 14,
    resizeMode: 'cover',
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    gap: 6,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.2,
  },
  id: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    backgroundColor: '#F97316',
    borderRadius: 50,
    height: 20,
    width: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  description: {
    fontSize: 12.5,
    color: '#6B7280',
    lineHeight: 18,
  },
  ctaRow: {
    marginTop        : 6,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F97316',
    letterSpacing: 0.2,
  },
});
