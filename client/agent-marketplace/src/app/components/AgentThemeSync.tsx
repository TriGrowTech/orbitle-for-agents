import { useEffect } from 'react';
import { useAgent } from '../context/AgentContext';
import { useTheme } from '../context/ThemeContext';

// Maps agent DB theme → themeConfig IDs
const THEME_MAP: Record<string, string> = {
  navy: 'navy',
  red: 'red',
  cyan: 'cyan',
  default: 'default',
};

/**
 * Invisible component — syncs the agent's theme from AgentContext
 * into the ThemeContext so ALL existing components (Navbar, cards, etc.)
 * automatically pick up the agent's branding color.
 */
export default function AgentThemeSync() {
  const { agent, isTenantMode } = useAgent();
  const { setThemeColor } = useTheme();

  useEffect(() => {
    if (isTenantMode && agent?.theme) {
      const mappedTheme = THEME_MAP[agent.theme] || 'default';
      setThemeColor(mappedTheme);
    }
  }, [agent?.theme, isTenantMode, setThemeColor]);

  return null; // renders nothing
}
