import { tick } from "@angular/core/testing";

export class User {
    userId:number;
    userName: string;
    password: string;
    userType: string;


    constructor(userId:number, userName: string, password: string, userType: string) {
        this.userId=userId,
        this.userName = userName;
        this.password = password;
        this.userType = userType;
    }
}
