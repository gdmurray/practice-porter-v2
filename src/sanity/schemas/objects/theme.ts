import { defineField } from "sanity";

export const themeField = (defaultTheme: "dark" | "white" | "cream" = "cream") =>
  defineField({
    name: "theme",
    title: "Section Theme",
    type: "string",
    options: {
      list: [
        { value: "dark", title: "Dark Blue" },
        { value: "white", title: "White" },
        { value: "cream", title: "Cream" },
      ],
      layout: "radio",
    },
    initialValue: defaultTheme,
  });
