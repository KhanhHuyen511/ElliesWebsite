interface Theme {
  color: string;
  backgroundColor: string;
  textMediumColor: string;
  textLightColor: string;
  textG050Color: string;
  textBoldColor: string;
  bgMediumColor: string;
  bgBoldColor: string;
  iconMediumColor: string;
  bgCardLight: string;
  bgSaveLight: string;
  bgG050Color: string;
}

export const LightTheme: Theme = {
  color: "var(--text-bold-color)",
  backgroundColor: "var(--W)",
  textMediumColor: "var(--text-medium-color)",
  textLightColor: "var(--text-light-color)",
  textG050Color: "var(--G050)",
  textBoldColor: "var(--text-bold-color)",
  bgMediumColor: "var(--W)",
  bgBoldColor: "var(--W)",
  bgCardLight: "var(--Y200)",
  bgSaveLight: "var(--BL050)",
  bgG050Color: "var(--G050)",
  iconMediumColor: "var(--text-bold-color)",
};

export const DarkTheme: Theme = {
  color: "var(--G100)",
  backgroundColor: "var(--BG-Dark)",
  textMediumColor: "var(--G450)",
  textLightColor: "var(--G450)",
  textG050Color: "var(--G400)",
  textBoldColor: "var(--BL200)",
  bgMediumColor: "var(--G100)",
  bgBoldColor: "var(--BG-m-Dark)",
  bgCardLight: "var(--BG-m-Dark)",
  bgSaveLight: "var(--BG-m-Dark)",
  bgG050Color: "var(--BG-Dark)",
  iconMediumColor: "var(--G100)",
};
