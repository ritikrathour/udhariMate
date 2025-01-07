import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { Store } from './ReduxStore/Store.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast" 
// import { ErrorBoundary } from './utils/ErrorBoundry';
ReactDOM.createRoot(document.getElementById('root')).render(
  //   <React.StrictMode>
  // <ErrorBoundary> 
  <BrowserRouter>
    <Provider store={Store}> 
        <Toaster toastOptions={{
          style: {
            background: "rgb(51,65,85)",
            color: "#fff"
          }
        }} />
        <App /> 
    </Provider>
  </BrowserRouter>
  // </ErrorBoundary>
  /* </React.StrictMode> */
)
