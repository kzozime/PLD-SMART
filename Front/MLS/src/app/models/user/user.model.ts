export class User{
   
   
      

    constructor( 
        public firstName : string, public lastName: string,
        public dateOfBirth: Date, public  email: string,
        public password: string, public nbInvitation: number,
        public verified: boolean
                  )
    {
        this.nbInvitation = 2;
        this.verified = false;
    }
}