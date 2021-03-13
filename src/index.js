import ReactDOM from 'react-dom';
import App from './App.js';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

const test = document.createElement('script');
test.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";

document.getElementsByTagName('body')[0].appendChild(test);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);