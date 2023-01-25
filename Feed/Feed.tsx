import React from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonFooter,
} from '@ionic/react';

import { StatusBar, Style } from '@capacitor/status-bar';

import { Menu } from '@vqs/components';

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const App: React.FC = () => {
  return (
    <IonApp>
      <IonSplitPane when="sm" contentId="main">
        <Menu />

        <div className="ion-page" id="main">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle>Feed</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">Feed Content</IonContent>
          <IonFooter>
            <IonToolbar>
              <IonTitle>Footer</IonTitle>
            </IonToolbar>
          </IonFooter>
        </div>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
