import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

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

export const getUserImageFromName = async (userName) => {
  try {
    const q = query(
      collection(db, "users"),
      where("first_name", "==", userName)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    let imageUrl = null;
    querySnapshot.forEach((doc) => {
      imageUrl = doc.data().image_urls; // This is an array
    });

    return imageUrl;
  } catch (error) {
    console.error("Error retrieving user image:", error);
    return null;
  }
};

export const getUserBioFromName = async (userName) => {
  let allUsersWithBios = {};
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc, i) => {
    const userData = doc.data();

    const firstName = userData.first_name;
    const bio = userData.bio;

    allUsersWithBios[firstName] = bio;
  });

  return allUsersWithBios[userName];
};
