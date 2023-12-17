import React from "react";
import "./PlaceholderContainer.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SickIcon from "@mui/icons-material/Sick";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import { Dispatch, SetStateAction } from "react";

interface PlaceholderContainerProps {
  sendMessage: (userMsg: string) => void;
}

function PlaceholderContainer({ sendMessage }: PlaceholderContainerProps) {
  const qnOnBreastCancer = "What is breast cancer and how does it affect us?";
  const qnOnNauseaMngment = "How can I better manage nausea?";
  const qnOnTreatmentMngment = "Where should I go for treatment?";

  const handleQuestion = (query: string) => {
    sendMessage(query);
  };
  return (
    <div className="placeholder-container">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="medipal-logo" />
      </div>
      <h1>Medipal</h1>
      <p>
        Welcome to Medipal! MediPal is a healthtech startup under
        <span> MEDTECH NUS </span> and <span> NUS HANGAR </span> incubator. To
        start, feel free to chat with us or use one of our commonly asked
        questions to get you started.
      </p>
      <div className="hint-cards">
        <div
          className="hint-card"
          onClick={() => handleQuestion(qnOnBreastCancer)}
        >
          <div>
            <CoronavirusIcon fontSize="large" />
          </div>
          <span>{qnOnBreastCancer}</span>
        </div>
        <div
          className="hint-card"
          onClick={() => handleQuestion(qnOnNauseaMngment)}
        >
          <div>
            <SickIcon fontSize="large" />
          </div>
          <span>{qnOnNauseaMngment}</span>
        </div>
        <div
          className="hint-card"
          onClick={() => handleQuestion(qnOnTreatmentMngment)}
        >
          <div>
            <LocationOnIcon fontSize="large" />
          </div>
          <span>{qnOnTreatmentMngment}</span>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderContainer;
