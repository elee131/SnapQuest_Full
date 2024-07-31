import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const clearCollection = functions.pubsub.schedule('every day 00:00').onRun(async (context) => {
  const collectionRef = admin.firestore().collection('todays_pictures');

  try {
    const snapshot = await collectionRef.get();
    const batch = admin.firestore().batch();
    
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Collection cleared successfully');
  } catch (error) {
    console.error('Error clearing collection:', error);
  }
});

export const modifyDocuments = functions.pubsub.schedule('every day 00:00').onRun(async (context) => {
    const collectionRef = admin.firestore().collection('users');
  
    try {
      const snapshot = await collectionRef.get();
      const batch = admin.firestore().batch();
      
      snapshot.forEach((doc) => {
        const docRef = doc.ref;
        const data = doc.data();
        if (!data.completedDaily) {
            const updatedData = {
                currStreak: 0
            };
            batch.update(docRef, updatedData);
        } else {
            const updatedData = {
                completedDaily: false
            };
            batch.update(docRef, updatedData);
        }
      
        
      });
  
      await batch.commit();
      console.log('Documents modified successfully');
    } catch (error) {
      console.error('Error modifying documents:', error);
    }
});