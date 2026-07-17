import { defineField } from "sanity";

export const themeField = (
  defaultTheme:
    | "white"
    | "lotion"
    | "cream"
    | "vanilla"
    | "red"
    | "gradient" = "lotion"
) =>
  defineField({
    name: "theme",
    title: "Section Theme",
    type: "string",
    options: {
      list: [
        { value: "white", title: "White" },
        { value: "lotion", title: "Lotion (warm off-white)" },
        { value: "cream", title: "Cream (deeper warm off-white)" },
        { value: "vanilla", title: "Vanilla Blush" },
        { value: "red", title: "Burnt Red (bold accent)" },
        { value: "gradient", title: "Gradient (hero / CTA only)" },
      ],
      layout: "radio",
    },
    initialValue: defaultTheme,
  });
