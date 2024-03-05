import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useApi, { SearchType } from "../hooks/useApi";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("SEARCH : ", searchTerm);

    if(searchTerm===''){
      setResults([]);
      return
    }
    const loadData = async() => {
      const result = await searchData(searchTerm, type)
      console.log("`file: HOme.tsx:31 ~ loadData ~ result", result);
      
    }
    loadData()

  }, [searchTerm]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color={"primary"} >My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>select Searchtype</IonLabel>
          <IonSelect
            value={searchTerm}
            onIonChange={(e) => setType(e.detail.value!)}
          >
            <IonSelectOption value={""}>All</IonSelectOption>
            <IonSelectOption value={"movie"}>Movie</IonSelectOption>
            <IonSelectOption value={"series"}>Series</IonSelectOption>
            <IonSelectOption value={"episode"}>Episode</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
