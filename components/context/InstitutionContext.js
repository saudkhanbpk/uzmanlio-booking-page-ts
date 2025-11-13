"use client"; 
import React, { createContext, useContext, useReducer } from "react";

// 1. Create Context
const InstitutionContext = createContext();

// 2. Reducer function
function institutionReducer(state, action) {
  switch (action.type) {
    case "SET_INSTITUTIONS":
      return { ...state, Institutions: action.payload, loading: false, error: null };

    case "ADD_INSTITUTION":
      return { ...state, Institutions: [...state.Institutions, action.payload] };

    case "PATCH_INSTITUTION":
      return {
        ...state,
        Institutions: state.Institutions.map(inst =>
          inst.id === action.payload.id
            ? deepMerge(inst, action.payload)
            : inst
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

// 3. Deep merge helper
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
export function InstitutionProvider({ children }) {
  const [state, dispatch] = useReducer(institutionReducer, {
    Institutions: [],
    loading: true,
    error: null,
  });

  const setInstitutions = (Institutions) => dispatch({ type: "SET_INSTITUTIONS", payload: Institutions });
  const addInstitution = (institution) => dispatch({ type: "ADD_INSTITUTION", payload: institution });
  const patchInstitution = (institution) => dispatch({ type: "PATCH_INSTITUTION", payload: institution });
  const setLoading = (loading) => dispatch({ type: "SET_LOADING", payload: loading });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  return (
    <InstitutionContext.Provider
      value={{
        Institutions: state.Institutions,
        loading: state.loading,
        error: state.error,
        setInstitutions,
        addInstitution,
        patchInstitution,
        setLoading,
        setError,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
}

// 5. Custom hook
export function useInstitution() {
  const context = useContext(InstitutionContext);
  if (!context) {
    throw new Error("useInstitution must be used inside InstitutionProvider");
  }
  return context;
}
