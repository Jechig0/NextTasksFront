export interface Task {
    id:             number;
    title:          string;
    description:    string;
    creationDate:   Date;
    dueDate:        Date;
    priority:       number;
    completionDate?: Date;
    board:          Board;
    tags:           Tag[];
}

export interface Board {
    id:          number;
    name:        string;
    description: string;
    colorCode:   string;
    owner:       Owner;
}

export interface Owner {
    id:       number;
    fullName: string;
    username: string;
    email:    string;
}

export interface Tag {
    id:        number;
    name:      string;
    colorCode: string;
    owner:     Owner;
}




