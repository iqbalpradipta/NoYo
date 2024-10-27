import { Dispatch, SetStateAction } from "react";

export interface IPerks {
    selected: string[],
    onChange: Dispatch<SetStateAction<string[]>>
}