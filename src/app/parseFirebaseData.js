import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const convertFirebaseDataToUserDictionary = async () => {
  let allUsersWithBios = {};
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const userData = doc.data();

    const firstName = userData.first_name;
    const bio = userData.bio;

    allUsersWithBios[firstName] = bio;
  });

  return allUsersWithBios;
};
