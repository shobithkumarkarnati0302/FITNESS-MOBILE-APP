import { StyleSheet,Text,View,ScrollView,TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import muscles_groups from '../constants/muscles';

const DIFFICULTY_COLORS = (difficulty)=>{
  switch(difficulty){
    case 'beginner':
      return '#22C55E';
    case 'intermediate':
      return '#F59E0B';
    case 'expert':
      return '#EF4444';
    default:
      return '#F3F4F6';
  }
}

const TYPE_COLORS = (exer_type)=>{
  switch(exer_type){
    case 'strength':
      return '#2563EB';
    case 'cardio':
      return '#EA580C';
    case 'stretching':
      return '#16A34A';
    case 'plyometrics':
      return '#9333EA';
    case 'powerlifting':
      return '#f60808ff';
    case 'olympic weightlifting':
      return '#0891B2';
    default:
      return '#F3F4F6';
  }
}

const WorkoutDetailScreen = ({ route, navigation }) => {
  const { exercise } = route.params;

  const difficultyColor = DIFFICULTY_COLORS(exercise.difficulty)
  const typeStyle       = TYPE_COLORS(exercise.type?.toLowerCase());

  // const muscles = muscles_groups[exercise.muscle];

  
  // console.log(exercise.muscle)

  return (
    <SafeAreaView style={styles.safe}>
      {/* <ImageBackground source={img.image} style={styles.image} resizeMode="cover"> */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={2}>
            {exercise.name}
          </Text>
        </View>

        {/* Hero row */}
        <View style={styles.heroRow}>
          {/* Type */}
          <View style={styles.heroCard}>
            <View style={[styles.heroAccentBar, { backgroundColor: typeStyle }]}/>
            <View style={styles.heroCardInner}>
              <Text style={styles.heroCardTitle}>Type</Text>
                <View>
                  <Text style={styles.heroCardText}>{exercise.type}</Text>
                </View>
            </View>
          </View>

          {/* Difficulty */}
          <View style={styles.heroCard}>
            <View style={[ styles.heroAccentBar,{ backgroundColor: difficultyColor },]}/>
            <View style={styles.heroCardInner}>
              <Text style={styles.heroCardTitle}>Difficulty</Text>
                <View>
                  <Text style={styles.heroCardText}>{exercise.difficulty}</Text>
                </View>
            </View>
          </View>

          {/* Muscle */}
          <View style={styles.heroCard}>
            <View style={[styles.heroAccentBar, { backgroundColor: '#cb06c1ff' }]}/>
            <View style={styles.heroCardInner}>
              <Text style={styles.heroCardTitle}>Muscle</Text>
                <View>
                  <Text style={styles.heroCardText}>{exercise.muscle}</Text>
                </View>
            </View>
          </View>
        </View>

        {/* Image */}
        <View>
          {/* <Image source={muscles.image} /> */}
        </View>

        {/* Equipment */}
        <View style={styles.section}>
          <View style={[styles.accentBar, { backgroundColor: difficultyColor }]}/>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>Equipments</Text>
            <View style={styles.equipRow}>
              {exercise.equipments.length > 0 ? (
                exercise.equipments.map((eq, i) => (
                  <View key={i} style={styles.equipTag}>
                    <Text style={styles.equipText}>{eq}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.equipTag}>
                  <Text style={styles.equipText}>No Equipment</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <View style={[styles.accentBar, { backgroundColor: difficultyColor }]}/>
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {exercise.instructions ? (
              <Text style={styles.instructions}>{exercise.instructions}</Text>
            ) : (
              <Text style={styles.instructions}>No Instructions</Text>
            )}
          </View>
        </View>

        {/* Safety Info */}
        <View style={styles.section}>
          <View
            style={[styles.accentBar, { backgroundColor: difficultyColor }]}
          />
          <View style={styles.sectionInner}>
            <Text style={styles.sectionTitle}>Safety Info</Text>
            {exercise.safety_info ? (
              <Text style={styles.instructions}>{exercise.safety_info}</Text>
            ) : (
              <Text style={styles.instructions}>No Safety Info</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  scroll: {
    paddingBottom: 40,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 14,
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 26,
    letterSpacing: 0.1,
  },
  heroRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  heroCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: 'hidden',
  },
  heroCardInner: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  heroCardTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },
  heroAccentBar: {
    height: 5,
    width: '100%',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  section: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: 'hidden',
  },
  accentBar: {
    width: 5,
  },
  sectionInner: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  equipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  equipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },

  instructions: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
});
