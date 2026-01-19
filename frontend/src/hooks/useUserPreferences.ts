import { useState, useEffect, useCallback } from 'react';
import userPreferencesService, { UserPreferences } from '../services/userPreferencesService';
import { useAuth } from '../context/AuthContext';

/**
 * Hook to manage user preferences with automatic persistence
 */
export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load preferences on mount
  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      setError(null);
      const prefs = await userPreferencesService.getUserPreferences();
      setPreferences(prefs);
    } catch (err) {
      console.error('Failed to load user preferences:', err);
      setError('Failed to load preferences');
      // Set empty preferences on error
      setPreferences({
        userId: user?.id || 0,
        preferences: {},
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update preferences (full replace)
   */
  const updatePreferences = useCallback(
    async (newPreferences: Record<string, any>) => {
      if (!user) return;

      try {
        const updated = await userPreferencesService.updateUserPreferences(newPreferences);
        setPreferences(updated);
        return updated;
      } catch (err) {
        console.error('Failed to update preferences:', err);
        setError('Failed to update preferences');
        throw err;
      }
    },
    [user]
  );

  /**
   * Merge preferences (partial update)
   */
  const mergePreferences = useCallback(
    async (partialPreferences: Record<string, any>) => {
      if (!user) return;

      try {
        const updated = await userPreferencesService.mergeUserPreferences(partialPreferences);
        setPreferences(updated);
        return updated;
      } catch (err) {
        console.error('Failed to merge preferences:', err);
        setError('Failed to merge preferences');
        throw err;
      }
    },
    [user]
  );

  /**
   * Save tools configuration
   */
  const saveTools = useCallback(
    async (tools: any[]) => {
      return mergePreferences({ tools });
    },
    [mergePreferences]
  );

  /**
   * Save dashboards configuration
   */
  const saveDashboards = useCallback(
    async (dashboards: any[]) => {
      return mergePreferences({ dashboards });
    },
    [mergePreferences]
  );

  /**
   * Save selected site
   */
  const saveSelectedSite = useCallback(
    async (siteId: string) => {
      return mergePreferences({ selectedSite: siteId });
    },
    [mergePreferences]
  );

  /**
   * Save sidebar state
   */
  const saveSidebarState = useCallback(
    async (isOpen: boolean) => {
      return mergePreferences({ sidebarOpen: isOpen });
    },
    [mergePreferences]
  );

  return {
    preferences: preferences?.preferences || {},
    loading,
    error,
    updatePreferences,
    mergePreferences,
    saveTools,
    saveDashboards,
    saveSelectedSite,
    saveSidebarState,
    reload: loadPreferences,
  };
}
