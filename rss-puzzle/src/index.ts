import App from './app/app';
import './app/styles.css';

function runApp() {
  const app = new App();
  return app;
}
const application = runApp();

export default application;
