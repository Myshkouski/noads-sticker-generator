import type { Config } from 'tailwindcss'
import daisyUi from 'daisyui'

export default <Config>{
  content: [
    "./src/**/*.{ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyUi
  ],
  safelist: [
    {
      pattern: /^(text|bg)-(\w+)-(\d+)$/
    }
  ],
  daisyui: {
    themes: ["night", "emerald"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "night", // name of one of the included themes for dark mode
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
