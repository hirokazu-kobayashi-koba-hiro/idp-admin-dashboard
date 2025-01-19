import { atom } from "jotai";

export const systemAlertAtom = atom({
  open: false,
  title: "",
  body: null,
  onClickPositiveButton: () => {},
  onClickNegativeButton: () => {},
});
