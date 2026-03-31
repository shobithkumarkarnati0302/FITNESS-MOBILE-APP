import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Lock } from 'lucide-react-native';
// import Toast from 'react-native-toast-message';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfileRequest, authFailure } from '../store/actions/authAction';
import {
  selectUser,
  selectAuthLoading,
  selectAuthError,
} from '../store/selectors/authSelector';

const GENDERS = ['male', 'female', 'other'];
const PLANS = ['Free', 'Pro', 'Elite'];

const EditProfileScreen = ({ navigation }: any) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name ?? '');
  const [height, setHeight] = useState(user?.height?.toString() ?? '');
  const [weight, setWeight] = useState(user?.weight?.toString() ?? '');
  const [age, setAge] = useState(user?.age?.toString() ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [plan, setPlan] = useState(user?.plan ?? 'Free');

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setHeight(user.height?.toString() ?? '');
      setWeight(user.weight?.toString() ?? '');
      setAge(user.age?.toString() ?? '');
      setGender(user.gender ?? '');
      setPlan(user.plan ?? 'Free');
    }
  }, [user]);

  // Handle navigation after save finishes
  useEffect(() => {
    if (submitted && !loading) {
      if (!error) {
        navigation.goBack();
        ToastAndroid.showWithGravity('Your profile has been Updated Successfully.', ToastAndroid.SHORT, ToastAndroid.TOP);
      }
      setSubmitted(false);
    }
  }, [loading, error, submitted, navigation]);

  const handleSave = () => {
    if (!name.trim()) {
      dispatch(authFailure('Name cannot be empty.'));
      return;
    }
    setSubmitted(true);
    dispatch(
      updateProfileRequest({
        name: name.trim(),
        email: user?.email,
        height: height ? Number(height) : undefined,
        weight: weight ? Number(weight) : undefined,
        age: age ? Number(age) : undefined,
        gender: gender || undefined,
        plan: plan || undefined,
      }),
    );
    // Toast.show({
    //   type: 'success',
    //   text1: 'This is an info message',
    //   position: 'top',
    //   visibilityTime: 3000,
    //   autoHide: true
    // });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.headerSub}>Update your</Text>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Name & E-Mail */}
          <View style={styles.card}>
            {/* Name */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. John Doe"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* E-Mail */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>
                Email <Lock size={12} color="#9CA3AF" />
              </Text>
              <View style={[styles.input, styles.inputDisabled]}>
                <Text style={styles.inputDisabledText}>{user?.email}</Text>
              </View>
            </View>
          </View>

          {/* Physical stats */}
          <View style={styles.card}>
            <View style={styles.row}>
              {/* Height */}
              <View style={[styles.fieldWrap, { flex: 1 }]}>
                <Text style={styles.label}>
                  Height <Text style={styles.unit}>cm</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="175"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              {/* Weight */}
              <View style={[styles.fieldWrap, { flex: 1 }]}>
                <Text style={styles.label}>
                  Weight <Text style={styles.unit}>kg</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="70"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Age */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>
                Age <Text style={styles.unit}>yrs</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="25"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            {/* Gender */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderRow}>
                {GENDERS.map(g => {
                  const active = gender === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.genderBtn,
                        active && styles.genderBtnActive,
                      ]}
                      onPress={() => setGender(g)}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.genderBtnText,
                          active && styles.genderBtnTextActive,
                        ]}
                      >
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Plan */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Plan</Text>
              <View style={styles.genderRow}>
                {PLANS.map(p => {
                  const active = plan === p;
                  return (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.genderBtn,
                        active && styles.genderBtnActive,
                      ]}
                      onPress={() => setPlan(p)}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.genderBtnText,
                          active && styles.genderBtnTextActive,
                        ]}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Save button */}
          <TouchableOpacity
            style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { paddingHorizontal: 16, paddingBottom: 48 },

  /* header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 24,
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
  headerText: { flex: 1 },
  headerSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.2,
  },

  /* error */
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    gap: 18,
  },

  /* field */
  fieldWrap: { gap: 6 },
  label: {
    color: '#374151',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  unit: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  /* row */
  row: { flexDirection: 'row', gap: 12 },

  /* inputs */
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#111827',
  },
  inputDisabled: {
    justifyContent: 'center',
    opacity: 0.6,
  },
  inputDisabledText: { color: '#6B7280', fontSize: 15 },

  /* gender/plan items */
  genderRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  genderBtn: {
    minWidth: '28%',
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  genderBtnActive: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  genderBtnText: { fontSize: 13, fontWeight: '700', color: '#9CA3AF' },
  genderBtnTextActive: { color: '#F97316' },

  /* save */
  saveBtn: {
    backgroundColor: '#F97316',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  saveBtnDisabled: { opacity: 0.55 },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
