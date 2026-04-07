// ─── Atlas Config Context ─────────────────────────────────────────────────
// Provides the active config + setter to the entire component tree.

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AtlasConfig } from './atlasConfig';
import { ironvale, meridian, novapharma } from './presets';

const PRESETS: Record<string, AtlasConfig> = {
  ironvale,
  meridian,
  novapharma,
};

interface ConfigContextValue {
  config: AtlasConfig;
  presetId: string;
  setPreset: (id: string) => void;
  presetList: { id: string; label: string; industry: string }[];
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [presetId, setPresetId] = useState('ironvale');
  const config = PRESETS[presetId] || ironvale;

  const setPreset = useCallback((id: string) => {
    if (PRESETS[id]) setPresetId(id);
  }, []);

  // Apply theme CSS custom properties whenever config changes
  useEffect(() => {
    const root = document.documentElement;
    const t = config.theme;
    root.style.setProperty('--atlas-primary', t.primary);
    root.style.setProperty('--atlas-primary-hex', t.primaryHex);
    root.style.setProperty('--atlas-accent', t.accent);
    root.style.setProperty('--atlas-accent-hex', t.accentHex);
    root.style.setProperty('--atlas-surface', t.surface);
    root.style.setProperty('--atlas-surface-border', t.surfaceBorder);
    root.style.setProperty('--atlas-background', t.background);
    root.style.setProperty('--atlas-sidebar-bg', t.sidebarBg);
    root.style.setProperty('--atlas-header-bg', t.headerBg);
    root.style.setProperty('--atlas-text-primary', t.textPrimary);
    root.style.setProperty('--atlas-text-secondary', t.textSecondary);
    root.style.setProperty('--atlas-text-muted', t.textMuted);
    root.style.setProperty('--atlas-success', t.success);
    root.style.setProperty('--atlas-success-hex', t.successHex);
    root.style.setProperty('--atlas-warning', t.warning);
    root.style.setProperty('--atlas-warning-hex', t.warningHex);
    root.style.setProperty('--atlas-danger', t.danger);
    root.style.setProperty('--atlas-danger-hex', t.dangerHex);
    root.style.setProperty('--atlas-info', t.info);
    root.style.setProperty('--atlas-info-hex', t.infoHex);
  }, [config.theme]);

  const presetList = Object.entries(PRESETS).map(([id, cfg]) => ({
    id,
    label: cfg.company.name,
    industry: cfg.company.industry,
  }));

  return (
    <ConfigContext.Provider value={{ config, presetId, setPreset, presetList }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useAtlas = (): ConfigContextValue => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useAtlas must be used within <ConfigProvider>');
  return ctx;
};
