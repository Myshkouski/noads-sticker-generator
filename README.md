# No Ads Sticker Generator

A web application to generate personalized anti-advertisement stickers for mailboxes. Create custom stickers that can be downloaded or shared.

## Features

- **Customizable Colors**: Choose from various color palettes and adjust shades
- **Personalized Text**: Add custom labels and descriptions
- **Download & Share**: Export stickers as high-quality PNG images or share them natively

## Tech Stack

- **Nuxt 3**: Vue.js framework with SSR/SSG capabilities
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind CSS
- **Appwrite**: Backend-as-a-Service for content management
- **QRCode.js**: QR code generation library
- **html2canvas**: HTML to image conversion

## Getting Started

### Prerequisites

- Bun (for package management and runtime)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Myshkouski/noads-sticker-generator.git
   cd noads-sticker-generator
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
bun run build
bun run preview
```

### Generate Static Site

```bash
bun run generate
```

## Usage

1. Open the application in your browser
2. Select your preferred color from the available palettes
3. Adjust the color variant using the slider
4. The QR code is automatically generated based on the configured link
5. Customize the text labels if needed
6. Click "Download" to save the sticker as a PNG file
7. Or use "Share" to share the sticker via native OS sharing (on supported devices)

## Configuration

The application uses Appwrite for dynamic content management. Key content includes:
- Page title and description
- QR code link and label
- Sticker text

## Deployment

This Nuxt app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting with SSR support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---
Generated with ❤️ for a world with fewer unwanted advertisements
