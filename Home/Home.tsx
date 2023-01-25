import React from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';

import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSplitPane,
  IonMenu,
  IonButton,
  IonButtons,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/react';

import { home, menu } from 'ionicons/icons';

import { Menu } from '../'

window.matchMedia('(prefers-color-scheme: dark)').addListener(async status => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const App: React.FC = () => (
  <IonApp>
    <IonSplitPane when="sm" contentId="main-content">
      <Menu theme={''} setTheme={undefined} />

      <div className="ion-page" id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon slot="icon-only" icon={menu}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Header Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h1>Home Content</h1>
        </IonContent>
      </div>
    </IonSplitPane>
  </IonApp>
);

export default App;
