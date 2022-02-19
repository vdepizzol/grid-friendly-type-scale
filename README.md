# Grid-friendly type scale

✨ Currently in progress ✨

This tool lets you tweak your type scale in pixels (like Figma does!), and generates a reusable output with font sizes set in `rem` units, and unitless line heights.

## To do

- [ ] About
  - [ ] Review project name + description
  - [ ] How it works section
- [ ] Code legibility
	- [ ] Normalize CSS classes
	- [ ] Normalize React component names
- [ ] Input control
	- [x] Input icons
	- [x] Input widths
		- [x] Match label width
		- [x] Compact width for numbers, relaxed for text
	- [x] Monospaced variant
	- [ ] spin-up/down functionality
	- [ ] Select dropdown component
- [ ] Type scale
	- [x] Mouseover line preview
	- [x] Editable sample text
		- [x] Auto-height textarea
	- [x] Delete button
	- [ ] Add button
	- [ ] Empty state
  - [ ] Font family selector
  - [ ] Preview default text
- [ ] Output
	- [x] Variable prefix
	- [ ] Correct CSS output
	- [ ] Simple syntax highlight
	- [ ] Emphasis on the active part of the code being edited
	- [ ] Different output options
		- [ ] Json
- [ ] Form validation
	- [ ] Invalid number
	- [ ] Minimum line height = font size
- [ ] Storage
	- [ ] Local storage
- [ ] Responsive design
	- [ ] No hover adjustments
	- [ ] Smaller screens

### Commands

- `npm start`  
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.\
  You will also see any lint errors in the console.

- `npm test`  
  Launches the test runner in the interactive watch mode.\
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build`  
  Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.\
  Your app is ready to be deployed!

  See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.