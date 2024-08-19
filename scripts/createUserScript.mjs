import { db } from '../firebaseConfig.js';
import { doc, setDoc, writeBatch } from "firebase/firestore";

const createUserProfiles = async (users) => {
  try {
    const batch = writeBatch(db);

    users.forEach(user => {
      const docRef = doc(db, "users", user.uid);
      const userData = {
        name: typeof user.name === 'string' ? user.name : '',
        email: typeof user.email === 'string' ? user.email : '',
        point: typeof user.point === 'number' ? user.point : 0,
        currStreak: typeof user.currStreak === 'number' ? user.currStreak : 0,
        longestStreak: typeof user.longestStreak === 'number' ? user.longestStreak : 0,
        completedDaily: typeof user.completedDaily === 'boolean' ? user.completedDaily : false,
        images: Array.isArray(user.images) ? user.images : [],
        profilePic: typeof user.profilePic === 'string' ? user.profilePic : ""
      };

      console.log(`Adding document for ${user.uid}:`, userData);
      batch.set(docRef, userData);
    });

    await batch.commit();
    console.log("All user profiles created successfully!");
  } catch (e) {
    console.error("Error creating user profiles: ", e);
  }
};

const users = [
  { uid: "user1", name: "Alice", email: "alice@example.com" },
  { uid: "user2", name: "Bob", email: "bob@example.com" },
  // Add more users if necessary
];

createUserProfiles(users);
