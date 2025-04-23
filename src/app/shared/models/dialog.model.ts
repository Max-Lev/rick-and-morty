import { DIALOG_TYPE_ENUM } from "./status.enum";

export interface IDialogHandler{
    title: string;
    dialogType: DIALOG_TYPE_ENUM;
}