export default class User {
    name: string;
    email: string;
    date_of_birth?: string;
    gender?: string;
    image?: string;

    constructor(
        userObject: any
    ) {
        this.name = userObject.name;
        this.email = userObject.email;
        this.date_of_birth = userObject.date_of_birth;
        this.gender = userObject.gender;
        this.image = userObject.image;
    }

}
