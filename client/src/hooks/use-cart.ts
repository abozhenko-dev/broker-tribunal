import { useContext } from "react";

import { TranslationContext } from "@contexts";

export const useCart = () => useContext(TranslationContext);
