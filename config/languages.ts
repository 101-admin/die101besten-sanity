export interface Language {
  id: string;
  title: string;
}

export const languages: Language[] = [
  { id: "de", title: "Deutsch" },
  { id: "en", title: "English" },
];

// We don't need languageOptions anymore since the plugin handles the UI
