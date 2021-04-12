import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { firestore } from "../firebase";
import {
  IonButton,
  IonIcon,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonPage,
  IonItemDivider,
  IonAvatar,
  IonRow,
  IonGrid,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./styleSheet.css";

const DoctorProfile: React.FC = () => {
  const [entry, setEntry] = useState<any>();
  useEffect(() => {
    firestore
      .collection("doctors")
      .where("doctorId", "==", "1")
      .get()
      .then((snapshot) => {
        const entry = snapshot.docs[0].data();
        //const entry = 1;
        console.log(entry);
        setEntry(entry);
        console.log(entry.doctorName);
        // doc.data() is never undefined for query doc snapshots
      });
  }, []);

  return (
    <IonContent
      scrollEvents={true}
      onIonScrollStart={() => {}}
      onIonScroll={() => {}}
      onIonScrollEnd={() => {}}
    >
      <IonItemDivider color="primary">
        <IonLabel></IonLabel>
      </IonItemDivider>

      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAvatar>
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonLabel id="doctor-name">
              Dr. {entry && entry.doctorName}, MD
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel id="doctor-title">
              Primary Care Doctor, Family Physician
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel class="grey-label">
              {entry && entry.doctorAddress && entry.doctorAddress["state"]}
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">Overall Rating</IonLabel>
          </IonRow>

          <IonRow>
            <IonText id="rating">4.75</IonText>
          </IonRow>
          <IonRow>
            <Rating
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={4.75}
              readonly={true}
            />
          </IonRow>
          <IonRow>
            <IonLabel class="heading">Recent Reviews</IonLabel>
          </IonRow>

          <IonRow>
            <p>
              {entry &&
                entry.doctorRating &&
                entry.doctorRating[0]["reviewComment"]}
            </p>
          </IonRow>
          <IonRow>
            <IonLabel class="grey-label">
              {entry &&
                entry.doctorRating &&
                entry.doctorRating[0]["patientName"]}
              &nbsp;&nbsp;{" "}
              {entry &&
                entry.doctorRating &&
                new Date(
                  entry.doctorRating[0]["date"].seconds * 1000
                ).toLocaleDateString("en-US")}
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonButton size="small" color="light">
              Read more Reviews
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">About Dr. Ramandeep Kaur</IonLabel>
          </IonRow>
          <IonRow>
            <p>{entry && entry.about}</p>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonLabel class="heading">Education and background</IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel class="sub-heading">Specialities</IonLabel>
          </IonRow>
          {entry &&
            entry.specialties.map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Education and training</IonLabel>
          </IonRow>
          {entry &&
            entry.education.map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Languages Spoken</IonLabel>
          </IonRow>
          {entry &&
            entry.languagesSpoken.map((row, index) => (
              <IonRow class="EBinfor">{row}</IonRow>
            ))}

          <IonRow>
            <IonLabel class="sub-heading">Provider's gender</IonLabel>
          </IonRow>
          <IonRow class="EBinfor">{entry && entry.Gender}</IonRow>
          <IonRow>
            <IonLabel class="sub-heading">NPI number</IonLabel>
          </IonRow>
          <IonRow class="EBinfor">{entry && entry.npiNumber}</IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid>
          <IonLabel class="heading">Patient Reviews</IonLabel>

          {entry &&
            entry.doctorRating.map((row, index) => (
              <IonRow>
                <p>{row.reviewComment}</p>
              </IonRow>
            ))}
        </IonGrid>
      </IonItem>
    </IonContent>
  );
};

export default DoctorProfile;
