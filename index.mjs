import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { getPatientDetailsByPhoneNumber } from './database.mjs';

const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('message', async (msg) => {
    const senderNumber = msg.from;

    try {
        const patient = await getPatientDetailsByPhoneNumber(senderNumber);

        if (patient) {
            const patientDetails = `
                Name: ${patient.patientName || 'N/A'}
                Address: ${patient.patientAddress || 'N/A'}
                Date of Birth: ${patient.patientDateOfBirth || 'N/A'}
                Email: ${patient.patientEmail || 'N/A'}
                Phone Number: ${patient.patientPhoneNumber || 'N/A'}
            `;

            const appointments = patient.appointments || [];
            const appointmentDetails = appointments.length
                ? appointments.map((appointment, index) => `
                    Appointment ${index + 1}:
                    Date: ${appointment.date || 'N/A'}
                    Time: ${appointment.time || 'N/A'}
                    Doctor: ${appointment.doctor || 'N/A'}
                `).join('\n')
                : 'No upcoming appointments.';

            await msg.reply(`Here are your details:\n${patientDetails}\n\n${appointmentDetails}`);
        } else {
            await msg.reply('Your number is not registered in our system.');
        }
    } catch (error) {
        await msg.reply('There was an error processing your request.');
        console.error('Error handling message:', error);
    }
});

client.initialize();
