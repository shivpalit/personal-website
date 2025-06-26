import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export async function sendEmail(contactData) {
    try {
        const command = new SendEmailCommand({
            Source: "Shiv Palit <shiv@shivpalit.com>",
            Destination: {
                ToAddresses: ["shivpalit@gmail.com"]
            },
            Message: {
                Subject: {
                    Data: `New Contact Form Submission from ${contactData.name}`
                },
                Body: {
                    Text: {
                        Data: `Name: ${contactData.name}\n\n` +
                              `Email: ${contactData.email}\n\n` +
                              `Message:\n${contactData.message}`
                    }
                }
            }
        });

        const response = await ses.send(command);
        return { success: true, messageId: response.MessageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
} 