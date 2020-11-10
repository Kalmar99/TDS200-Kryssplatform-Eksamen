import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NhostApolloProvider, NhostAuthProvider } from "react-nhost";
import {config} from './utils/nhost-config'
import { auth } from './utils/nhost';


// Boilerplate render code copied from: 
// https://docs.nhost.io/quick-start/client-app#add-nhostapolloprovider-to-index.js

ReactDOM.render(
    <React.StrictMode>
        <NhostAuthProvider auth={auth}>
            <NhostApolloProvider
                auth={auth}
                gqlEndpoint={config.gqlEndpoint}>
                <App />
            </NhostApolloProvider>
        </NhostAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
