export class Connection {
    id: string;
    accepted: boolean;
    archived: boolean;
    mentee: string;
    mentor: string;

    constructor(
        id: string,
        accepted : boolean,
        archived : boolean,
        mentee : string,
        mentor : string,
    ){
        this.id = id;
        this.accepted = accepted;
        this.archived = archived;
        this.mentee = mentee;
        this.mentor = mentor;
    }
}
