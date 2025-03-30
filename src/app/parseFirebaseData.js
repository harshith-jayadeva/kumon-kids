import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const convertFirebaseDataToUserDictionary = async (currentUserId) => {
  let allUsersWithBios = {};
  let currentUserIndex = 0;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc, i) => {
    const userData = doc.data();

    const firstName = userData.first_name;
    const bio = userData.bio;

    if (doc.id == currentUserId) {
      currentUserIndex = i;
    }

    allUsersWithBios[firstName] = bio;
  });

  return [allUsersWithBios, currentUserIndex];
};