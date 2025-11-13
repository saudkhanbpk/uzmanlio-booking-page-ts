"use client"; 
import React, { createContext, useContext, useReducer } from "react";

// 1. Create Context
const ExpertContext = createContext();

// 2. Reducer Function
function expertReducer(state, action) {
  switch (action.type) {
    case "SET_EXPERTS":
      return { ...state, Experts: action.payload, loading: false, error: null };

    case "ADD_EXPERT":
      return { ...state, Experts: [...state.Experts, action.payload] };

    case "PATCH_EXPERT":
      return {
        ...state,
        Experts: state.Experts.map(expert =>
          expert.id === action.payload.id
            ? deepMerge(expert, action.payload)
            : expert
        ),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

// 3. Deep Merge Helper
function deepMerge(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) {
    const map = new Map();
    target.forEach(item => item.id && map.set(item.id, item));
    source.forEach(item => {
      if (item.id && map.has(item.id)) {
        map.set(item.id, { ...map.get(item.id), ...item });
      } else {
        map.set(item.id || Date.now(), item);
      }
    });
    return Array.from(map.values());
  }

  if (target && source && typeof target === "object" && typeof source === "object") {
    const result = { ...target };
    for (const key in source) {
      result[key] = deepMerge(target[key], source[key]);
    }
    return result;
  }

  return source !== undefined ? source : target;
}

// 4. Provider Component
export function ExpertProvider({ children }) {
  const [state, dispatch] = useReducer(expertReducer, {
    Experts: [],
    loading: true,
    error: null,
  });

  // Actions
  const setExperts = (Experts) => dispatch({ type: "SET_EXPERTS", payload: Experts });
  const addExpert = (expert) => dispatch({ type: "ADD_EXPERT", payload: expert });
  const patchExpert = (expert) => dispatch({ type: "PATCH_EXPERT", payload: expert });
  const setLoading = (loading) => dispatch({ type: "SET_LOADING", payload: loading });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  return (
    <ExpertContext.Provider
      value={{
        Experts: state.Experts,
        loading: state.loading,
        error: state.error,
        setExperts,
        addExpert,
        patchExpert,
        setLoading,
        setError,
      }}
    >
      {children}
    </ExpertContext.Provider>
  );
}

// 5. Custom Hook
export function useExpert() {
  const context = useContext(ExpertContext);
  if (!context) {
    throw new Error("useExpert must be used inside ExpertProvider");
  }
  return context;
}
