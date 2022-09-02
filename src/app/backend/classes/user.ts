export class User {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    workHistory: string;
    successStory: string;
    location: string;
    memberSince: string;
    memberType: string;
    username: string;
    email : string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        jobTitle: string,
        workHistory: string,
        successStory: string,
        location: string,
        memberSince: string,
        memberType: string,
        username: string,
        email: string
    ){
        this.id = id;
        this.firstName = firstName;
        this.lastName =  lastName;
        this.jobTitle =  jobTitle;
        this.workHistory = workHistory;
        this.successStory = successStory;
        this.location = location;
        this.memberSince = memberSince;
        this.memberType = memberType;
        this.username = username;
        this.email = email;
    }
}
