import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {compassOutline, personOutline,locationOutline} from 'ionicons/icons'
/*  Config  */
import {config} from './utils/nhost-config'

/*  Pages  */
import Home from './pages/Home';
import Login from './pages/Login'
import TripDetails from './pages/TripDetails'
import NewTrip from './pages/NewTrip'
import Register from './pages/Register';

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
import MyPage from './pages/MyPage';
import ProtectedRoute from './components/ProtectedRoute';



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
          <IonTabs>
            <IonRouterOutlet>
              <IonReactRouter>
                <Switch>
                  <Route path='/home' component={Home} exact={true} />
                  <Route path='/detail/:id' component={TripDetails} exact={true} />
                  <Route path='/newtrip' component={NewTrip} exact={true} />
                  <Route path='/login' component={Login} exact={true} />
                  <Route path='/register' component={Register} exact={true} />
                  { /* <ProtectedRoute path='/account' component={MyPage} exact={true} /> */}
                  <Route path='/account' component={MyPage} exact={true} />
                  <Route exact path='/' render={() => <Redirect to='/home' />} />
                </Switch>
              </IonReactRouter>
            </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                  <IonTabButton tab='home' href='/home'>
                      <IonIcon icon={compassOutline} />
                      <IonLabel>Utforsk</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='tur' href='/newtrip'>
                      <IonIcon icon={locationOutline} />
                      <IonLabel>Ny Tur</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="login" href='/login'>
                      <IonIcon icon={personOutline} />
                      <IonLabel>Min Konto</IonLabel>
                  </IonTabButton>
              </IonTabBar>
          </IonTabs>
        </IonAppStyled>
      </NhostApolloProvider>
  </NhostAuthProvider>
);

const IonAppStyled = styled(IonApp)`
  background-color: #FFFAFF;
`;

export default App;
