"use client";
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext({});

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchMode, setSearchMode] = useState('global'); // 'global' or 'client'
  const [searchQuery, setSearchQuery] = useState('');

  const switchToClientSearch = () => {
    setSearchMode('client');
    setSearchQuery(''); // Clear search when switching modes
  };

  const switchToGlobalSearch = () => {
    setSearchMode('global');
    setSearchQuery(''); // Clear search when switching modes
  };

  const value = {
    searchMode,
    searchQuery,
    setSearchQuery,
    switchToClientSearch,
    switchToGlobalSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};