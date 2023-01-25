import React, { useState, useRef } from 'react';
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
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  getConfig,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonPage,
  IonModal,
} from '@ionic/react';

import { options, search } from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

import { Menu } from '@vqs/components';
import SessionListFilter from './SessionListFilter';
import TabsBar from './TabsBar';

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
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [segment, setSegment] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [theme, setTheme] = useState('');
  const [showCompleteToast, setShowCompleteToast] = useState(true);

  const ios = getConfig()!.get('mode') === 'ios';

  const pageRef = useRef<HTMLElement>(null);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      // setShowCompleteToast(true);
    }, 2500);
  };

  return (
    <IonApp className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
      <IonSplitPane when="lg" contentId="main">
        <Menu theme={theme} setTheme={setTheme} />

        <IonPage ref={pageRef} className="ion-page" id="main">
          <IonHeader translucent={true}>
            <IonToolbar>
              {!showSearchbar && (
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
              )}
              {ios && (
                <IonSegment
                  value={segment}
                  onIonChange={(e) => setSegment(e.detail.value as any)}
                >
                  <IonSegmentButton value="all">Todos</IonSegmentButton>
                  <IonSegmentButton value="favorites">
                    Favoritos
                  </IonSegmentButton>
                </IonSegment>
              )}
              {!ios && !showSearchbar && <IonTitle>Tele Academia</IonTitle>}
              {showSearchbar && (
                <IonSearchbar
                  showCancelButton="always"
                  placeholder="Pesquisar por título, radiologista, id ou acesso."
                  onIonChange={(e: CustomEvent) =>
                    setSearchText(e.detail.value)
                  }
                  onIonCancel={() => setShowSearchbar(false)}
                ></IonSearchbar>
              )}

              <IonButtons slot="end">
                {!ios && !showSearchbar && (
                  <IonButton onClick={() => setShowSearchbar(true)}>
                    <IonIcon slot="icon-only" icon={search}></IonIcon>
                  </IonButton>
                )}
                {!showSearchbar && (
                  <IonButton onClick={() => setShowFilterModal(true)}>
                    {ios ? (
                      'Filter'
                    ) : (
                      <IonIcon icon={options} slot="icon-only" />
                    )}
                  </IonButton>
                )}
              </IonButtons>
            </IonToolbar>

            {!ios && (
              <IonToolbar>
                <IonSegment
                  value={segment}
                  onIonChange={(e) => setSegment(e.detail.value as any)}
                >
                  <IonSegmentButton value="all">Todos</IonSegmentButton>
                  <IonSegmentButton value="favorites">
                    Favoritos
                  </IonSegmentButton>
                </IonSegment>
              </IonToolbar>
            )}
          </IonHeader>

          <IonContent fullscreen={true}>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonSearchbar
                  placeholder="Pesquisar por título, radiologista, id ou acesso."
                  onIonChange={(e: CustomEvent) =>
                    setSearchText(e.detail.value)
                  }
                ></IonSearchbar>
              </IonToolbar>
            </IonHeader>

            <IonRefresher
              slot="fixed"
              ref={ionRefresherRef}
              onIonRefresh={doRefresh}
            >
              <IonRefresherContent />
            </IonRefresher>

            <IonToast
              isOpen={showCompleteToast}
              message="Refresh complete"
              duration={2000}
              onDidDismiss={() => setShowCompleteToast(false)}
            />
          </IonContent>

          <IonFooter>
            <TabsBar />
          </IonFooter>

          <IonModal
            isOpen={showFilterModal}
            onDidDismiss={() => setShowFilterModal(false)}
            swipeToClose={true}
            presentingElement={pageRef.current!}
          >
            <SessionListFilter
              onDismissModal={() => setShowFilterModal(false)}
              allTracks={[]}
              filteredTracks={['aaa', 'bbb']}
            />
          </IonModal>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
