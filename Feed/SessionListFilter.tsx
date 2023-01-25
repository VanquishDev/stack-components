import React from 'react';

import { getMode } from '@ionic/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonFooter,
  IonIcon,
} from '@ionic/react';
import {
  logoAngular,
  call,
  document,
  logoIonic,
  hammer,
  restaurant,
  cog,
  colorPalette,
  construct,
  compass,
} from 'ionicons/icons';


interface OwnProps {
  onDismissModal: () => void;
}

interface StateProps {
  allTracks: string[];
  filteredTracks: string[];
}

interface DispatchProps {}

type SessionListFilterProps = OwnProps & StateProps & DispatchProps;

export const updateFilteredTracks = (filteredTracks: string[]) =>
  ({
    type: 'update-filtered-tracks',
    filteredTracks,
  } as const);

const SessionListFilter: React.FC<SessionListFilterProps> = ({
  allTracks,
  filteredTracks,
  onDismissModal,
}) => {
  const ios = getMode() === 'ios';

  const toggleTrackFilter = (track: string) => {
    if (filteredTracks.indexOf(track) > -1) {
      updateFilteredTracks(filteredTracks.filter((x) => x !== track));
    } else {
      updateFilteredTracks([...filteredTracks, track]);
    }
  };

  const handleDeselectAll = () => {
    updateFilteredTracks([]);
  };

  const handleSelectAll = () => {
    updateFilteredTracks([...allTracks]);
  };


  return (
    <>
      <IonHeader translucent={true} className="session-list-filter">
        <IonToolbar>
          <IonButtons slot="start">
            {ios && <IonButton onClick={onDismissModal}>Cancelar</IonButton>}
            {!ios && <IonButton onClick={handleDeselectAll}>Todos</IonButton>}
          </IonButtons>

          <IonTitle>Filtro Tags</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={onDismissModal} strong>
              OK
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="session-list-filter">
        <IonList lines={ios ? 'inset' : 'full'}>
          {['aaa','bbbb'].map((track, index) => (
            <IonItem key={track}>
              <IonLabel>{track}</IonLabel>
              <IonCheckbox
                onClick={() => toggleTrackFilter(track)}
                checked={filteredTracks.indexOf(track) !== -1}
                color="primary"
                value={track}
              ></IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      {ios && (
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleDeselectAll}>Desmarcar</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleSelectAll}>Marcar todos</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </>
  );
};

export default SessionListFilter;
