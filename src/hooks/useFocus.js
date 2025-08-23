import { useContext } from "react";
import { FocusContext } from "../context/FocusContext";

export const useFocus = () => useContext(FocusContext);
