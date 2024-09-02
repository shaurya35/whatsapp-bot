// database.mjs
import { db } from './firebaseConfig.mjs';
import { collection, query, where, getDocs } from 'firebase/firestore';

function normalizePhoneNumber(phoneNumber) {
    let normalized = phoneNumber.replace(/\D/g, '');

    if (normalized.startsWith('91')) {
        normalized = normalized.substring(2);
    }

    return normalized;
}

async function getPatientDetailsByPhoneNumber(phoneNumber) {
    try {
        const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
        console.log('Normalized Phone Number:', normalizedPhoneNumber);

        const q = query(collection(db, 'patients'), where('patientPhoneNumber', '==', normalizedPhoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const patientData = querySnapshot.docs[0].data();
            const appointments = patientData.appointments || []; // Fetch appointments array
            
            return { ...patientData, appointments }; // Return both patient details and appointments
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error fetching patient details:', error);
        throw error;
    }
}

export { getPatientDetailsByPhoneNumber };
