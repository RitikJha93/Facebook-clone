const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth

const oAuthLink = "https://developers.google.com/oauthplayground/"

const {EMAIL,MAILING_ID,MAILING_SECRET,MAILING_REFRESH} = process.env

const auth = new OAuth2(MAILING_ID,MAILING_SECRET,MAILING_REFRESH,oAuthLink )

exports.sendVerificationEmail = (email,name,url)=>{
    auth.setCredentials({
        refresh_token : MAILING_REFRESH
    })
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:'OAuth2',
            user:EMAIL,
            clientId:MAILING_ID,
            clientSecret:MAILING_SECRET,
            refreshToken:MAILING_REFRESH,
            accessToken,
        }
    })

    const mailOptions = {
        from:EMAIL,
        to:email,
        subject:"Facebook Email verification",
        html:`<div style="display:flex;align-items:center;max-width:700px;margin-bottom:1rem;gap:10px;font-family:Roboto,sans-serif;font-weight:600;color:#3b5998"><img style="max-width:50px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAA1UlEQVR4AWOwDp9LUzTELRi1wDdtaf+8w9sPXDtx7h4Q7Tt2c92OS9SxwCZibtesg0+fv3756i0aoo4FkxcdgxhHEwtiite8ePmGhhas3HIB2cRL1x5t3HV5xebzEEQFC67efAI3/cDxW7aR86icip6/QIRP9+xD1E+myOHTPv3AqAVA1DJ1/76jN+EI2YKLVx8hS+0+cgMY5yRbMHfVKbBxhNGFqw+B6mloweY9V2hrAbAIIceCugl7gE6DI2QTT124jyyVXrNxEKaiUQtGLRi1YNQCAMs01I34bbYCAAAAAElFTkSuQmCC" alt=""><span>Action required : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-family:Roboto,sans-serif;color:#141023;font-size:17px"><span>Hello ${name}</span></div><div style="padding:20px 0;font-family:Roboto,sans-serif"><span style="padding:1.5rem 0">You recently created an account on facebook. To complete your registration, Please confirm your account</span></div><a style="width:200px;padding:10px 15px;background-color:#4c649b;color:#fff;text-decoration:none;font-weight:600;font-family:Roboto,sans-serif" href=${url}>confirm your account</a><br><div style="margin:1.5rem 0;color:#898f9c;font-family:Roboto,sans-serif"><span>Facebook allows you to stay in touch with all your friends ,once registered on facebook, you can share photos, orgainze events and much more.</span></div>`
    }
    stmp.sendMail(mailOptions,(err,res)=>{
        if(err){
            return err
        }
        return res
    })
}


