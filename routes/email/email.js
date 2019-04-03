const AWS = require("aws-sdk");
function Email(data) {
  AWS.config.update({
    accessKeyId: "AKIASQKMXSW57H5ZL3XV",
    secretAccessKey: "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",
    region: "us-east-1"
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  // send to list
  var to = [data.email];

  // this must relate to a verified SES account
  var from = "dasari.arun@tansycloud.com";

  resetPasswordLink =
    "http://localhost:3000/user/" +
    encodeURIComponent(data._id) +
    "/resetPassword/";
  // this sends the email
  // @todo - add HTML version
  const sendEmail = ses
    .sendEmail({
      Source: from,
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Data: "A Message To You Rudy"
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data:
              "Hello " +
              data.first_name +
              " " +
              data.last_name +
              "; please click on this link to reset your password: " +
              resetPasswordLink
          }
        }
      }
    })
    .promise();
  sendEmail
    .then(data => {
      console.log("email was send");
    })
    .catch(error => {
      console.log(error);
    });

  return data;
}

exports.Email = Email;
