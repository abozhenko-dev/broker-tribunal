import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { StoreActions } from "@store/actions";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(StoreActions, dispatch);
};
