// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// //whiout this <App />, the page will be blank
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// This code will render the <App /> component into a dynamically created div element
// , which you can then inspect in the browser's developer tools to see the rendered output. 
// However, keep in mind that without a targeted DOM element, the rendered component 
// will not be visible on the page and will not be part of the page's DOM tree.
ReactDOM.render(<App />, document.getElementById('root'));

