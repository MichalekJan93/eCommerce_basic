/**
 * Prevent flash of unstyled content (FOUC) by setting theme before React loads
 */
(function () {
  const storageKey = "vite-ui-theme";
  const defaultTheme = "dark";
  const theme = localStorage.getItem(storageKey) || defaultTheme;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.documentElement.classList.add(systemTheme);
  } else {
    document.documentElement.classList.add(theme);
  }
})();
