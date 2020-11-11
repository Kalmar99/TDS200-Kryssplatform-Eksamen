import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/*  Config  */
import {config} from './utils/nhost-config'

/*  Pages  */
import Home from './pages/Home';
import Login from './pages/Login'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import styled from 'styled-components';
import { NhostApolloProvider, NhostAuthProvider } from 'react-nhost';
import { auth } from './utils/nhost';

/*  
    Boilerplate nhost code copied from: 
    https://docs.nhost.io/quick-start/client-app#add-nhostapolloprovider-to-index.js
    & refactored to same setup as shown in class. (to get rid of FindDomNode errors).
*/

const App: React.FC = () => (
  <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
      auth={auth}
      gqlEndpoint={config.gqlEndpoint}>
        <IonAppStyled>
          <IonReactRouter>
            <Switch>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/login" component={Login} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </Switch>
          </IonReactRouter>
        </IonAppStyled>
      </NhostApolloProvider>
  </NhostAuthProvider>
);

const IonAppStyled = styled(IonApp)`
  background-color: #FFFAFF;
`;

export default App;
