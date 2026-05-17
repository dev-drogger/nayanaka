'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface UIContextType {
  // Cursor state
  cursorType: string;
  setCursorType: (type: string) => void;
  
  // Navigation state
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Content visible state
  isContentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
  
  // Page mounted state
  isPageMounted: boolean;
  setPageMounted: (mounted: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorTypeState] = useState('default');
  const [menuOpen, setMenuOpenState] = useState(false);
  const [isLoading, setLoadingState] = useState(true);
  const [isContentVisible, setContentVisibleState] = useState(false);
  const [isPageMounted, setPageMountedState] = useState(false);

  const setCursorType = useCallback((type: string) => {
    setCursorTypeState(type);
  }, []);

  const setMenuOpen = useCallback((open: boolean) => {
    setMenuOpenState(open);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setLoadingState(loading);
  }, []);

  const setContentVisible = useCallback((visible: boolean) => {
    setContentVisibleState(visible);
  }, []);

  const setPageMounted = useCallback((mounted: boolean) => {
    setPageMountedState(mounted);
  }, []);

  const value: UIContextType = {
    cursorType,
    setCursorType,
    menuOpen,
    setMenuOpen,
    isLoading,
    setLoading,
    isContentVisible,
    setContentVisible,
    isPageMounted,
    setPageMounted,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
}
