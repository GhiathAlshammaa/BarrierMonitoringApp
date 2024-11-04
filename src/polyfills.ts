/***************************************************************************************************
 * Load `$localize` - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** Only load polyfills that are necessary for your target browsers **/

// Polyfills for modern browsers (ES6+)
// These polyfills may not be needed for recent browser versions. Only include what’s required.

import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/set';

/** 
 * Optional Polyfills:
 * Uncomment if needed, or keep them commented out if not required.
 */

// import 'classlist.js';  // Only if you need NgClass support on SVG elements (older browsers).
// import 'web-animations-js';  // Only if you need animations support (older browsers).

/***************************************************************************************************
 * Zone JS - Required by Angular for change detection.
 */
import 'zone.js';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 * Additional polyfills for specific application requirements.
 */

// Polyfills for additional libraries, if any (for example, specific date libraries, etc.)

// Conditional polyfill loading based on the environment
if (typeof window !== 'undefined') {
  // Only load browser-dependent polyfills here
  console.log("Browser environment detected - loading polyfills.");
} else {
  console.warn("Non-browser environment detected - skipping some polyfills.");
}

/***************************************************************************************************
 * CUSTOM POLYFILLS
 * Example for handling undefined variables or unexpected errors.
 */

// Handling undefined 'browser' variable as a workaround
if (typeof (window as any).browser === 'undefined') {
  (window as any).browser = {};  // Define browser as an empty object to prevent 'undefined' errors.
}
