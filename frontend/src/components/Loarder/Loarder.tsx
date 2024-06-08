import React from "react";
import "./loader.css";
import { ModalClassesBG } from "../components.styles";

const Loader: React.FC = () => (
  <div className={ModalClassesBG}>
    <div className="blob"></div>
  </div>
);

export default Loader;
