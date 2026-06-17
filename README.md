# Jasim Tiles — Tiles Calculator

Professional tile calculation and estimation web app for tile shops and contractors.

## Features
- Washroom tile calculator (floor + walls)
- Single wall calculator (tiles per wall)
- Floor calculator (tiles & boxes)
- Tile quantity calculator (area → tiles)
- Box calculator (tiles → boxes)
- Cost calculator (meter × rate)
- Receipt generator and print / PDF export
- Responsive UI with Tailwind CSS

## Screenshots
Add screenshots to `public/screenshots/` and update links here.

## Installation
1. Clone the repo

	```bash
	git clone https://github.com/mianshahzaiboutlook-sys/Tiles-Calculator.git
	cd Tiles-Calculator
	```

2. Install dependencies

	```bash
	npm install
	```

3. Run development server

	```bash
	npm run dev
	```

4. Build for production

	```bash
	npm run build
	npm start
	```

## Technologies
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4

## Folder structure
```
app/
  components/        # shared UI components
  washroom/          # washroom calculator page
  single-wall/       # single wall calculator
  floor/             # floor calculator
  tile-quantity/     # quantity calculator
  box/               # box calculator
  cost/              # cost calculator
  receipt/           # receipt generator
  page.js            # home/landing
  layout.js          # root layout with NavBar
public/              # static assets
package.json
README.md
```

## Deployment
- Recommended: Vercel (supports Next.js App Router)
- For Vercel: connect this GitHub repo and set no special environment variables.

## Author
Mian Shahzaib

## Notes
- Before publishing, run `npm run lint` and `npm run build` locally to resolve any warnings.
- Consider installing `html2canvas` and `jspdf` as dependencies and import them rather than loading from CDN for reliable PDF generation.

## License
Add license information here if desired.
