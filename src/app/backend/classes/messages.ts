export class Messages {
    id: string;
    sender: string;
    receiver: string;
    timeSent: string;
    message: string;

    constructor(
        id : string,
        sender : string,
        receiver : string,
        timeSent : string,
        message : string,
    ){
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.timeSent = timeSent;
        this.message = message;
    }
    
}
