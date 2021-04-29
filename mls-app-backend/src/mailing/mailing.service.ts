import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
const nodemailer = require("nodemailer");

@Injectable()
export class MailingService {
    
    constructor(){}

    OAuth2 = google.auth.OAuth2;
    oauth2Client = new this.OAuth2(
        "231277696886-g48cpfk6l19957ilvginheri8f5ni5ah.apps.googleusercontent.com", // ClientID
        "uxXu310BIQQTAjSo8PKQIwmZ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );
    
    cred = this.oauth2Client.setCredentials({
        refresh_token: "1//04EfManQrNx7GCgYIARAAGAQSNwF-L9IroVub8_Fc3GtvuUx5iiaeMPC2dGomS2yivVMzumo52xJvp4RXXSQDDZ_GO8Eu5PfhKuU"
    });
    
    accessToken = this.oauth2Client.getAccessToken();

    smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ghali.elalaoui.elabdellaoui@gmail.com", 
          clientId: "231277696886-g48cpfk6l19957ilvginheri8f5ni5ah.apps.googleusercontent.com",
          clientSecret: "uxXu310BIQQTAjSo8PKQIwmZ",
          refreshToken: "1//04EfManQrNx7GCgYIARAAGAQSNwF-L9IroVub8_Fc3GtvuUx5iiaeMPC2dGomS2yivVMzumo52xJvp4RXXSQDDZ_GO8Eu5PfhKuU",
          accessToken: this.accessToken
        }
    });

    mailOptions = {};

    sendMail(subject: string, email: string, code: string, username: string): void{
        this.mailOptions = {
            from: "ghali.elalaoui.elabdellaoui@gmail.com",
            to: email.toString(),
            subject: subject,
            generateTextFromHTML: true,
            html: "<h1>Hello "+username.toString()+"</h1><p>Here's you code: "+code.toString()
       };
        this.smtpTransport.sendMail(this.mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            this.smtpTransport.close();
        });
    }

}
