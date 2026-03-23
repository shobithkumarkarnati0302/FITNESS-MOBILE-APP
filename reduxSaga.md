# Context API to Redux Saga

## ️ Key Changes

### Context API (Old)

```tsx
// Inside Login Screen
const { login } = useContext(AuthContext);

const handleLogin = async () => {
  setLoading(true);
  try {
    const res = await axios.post("/login", data);
    setUser(res.data);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

### Redux Saga (New)

```tsx
// Inside Login Screen
const dispatch = useDispatch();
const handleLogin = () => {
  dispatch({ type: "auth/loginRequest", payload: data });
};

// Inside authSaga.ts (Logic)
function* loginWorker(action) {
  try {
    yield put(setLoading(true)); // Update UI to loading
    const res = yield call(axiosInstance.post, "/login", action.payload);
    yield put(setCredentials(res.data)); // Success!
  } catch (e) {
    yield put(setError(e.message)); // Error handling
  }
}
```

---

## 📁 Directory Structure

```
📁src
├──📁store        (Redux Config)
    ├── 📁 sagas   (Logic)
    │   └── 📄 authSaga.ts
    ├── 📁 slices  (State Definitions)
    │   └── 📄 authSlice.ts
    ├── 📄 RootSaga.tsx
    └── 📄 Store.tsx
```

### Directory Breakdown

- **`Store.tsx`**: The primary configuration file where the Redux store is created. It connects the slices (reducers) and the Saga middleware together.
- **`RootSaga.tsx`**: It combines all individual watchers (like `authSaga`). It ensure all background listeners start running when the app boots.
- **`sagas/`**: It Contains the special functions, which contains logic such as API calls and storage handling.
- **`slices/`**: Contains Redux Toolkit slices, which includes the initial state, reducers and actions which are used to update the state once an API call is made.
