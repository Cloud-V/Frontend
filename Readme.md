# ☁️ The Cloud V Frontend
This is the frontend for [Cloud V](https://github.com/Cloud-V/Cloud-V). It is based on React 16.

# Dependencies
* Node 14. You may want to install it using [tj/n](https://github.com/tj/n)
* yarn

To install node.js dependencies, just invoke `yarn`.
* Do not upgrade react, react-router-dom or reactstrap unless you are a masochist. This combination is the only one that works.

# Usage
Invoke `yarn watch`. Wait until compilation is done, then visit https://localhost:8080 in your browser.

# Repository Structure Highlights
* `public/`: Static Data
* `src/`: Source Code
    * `assets/`: A Limited Number Of Assets Compiled Into The SPA package
    * `containers/`: Top-level UI Containers
    * `models/`
    * `modules/`: Customized External Libraries
    * `partials/`
    * `scss/`: Stylesheets
    * `store/`: Immutable Data Store
    * `views/`
    * `index.js`: Entry Point
    * `App.js`: Top-Level Application, incl. Router

# ⚖️ License
All rights reserved, the American University in Cairo and the Cloud V Project.

You may distribute the software or any of its constituent source files; in part or in whole; under the terms of the GNU Affero General Public License v3, or at your option, any later version. See 'License' for more information.