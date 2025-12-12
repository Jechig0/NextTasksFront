import { Owner } from "./task.interface";

export interface Tag {
    id:        number;
    name:      string;
    colorCode: string;
    owner:     Owner;
}

