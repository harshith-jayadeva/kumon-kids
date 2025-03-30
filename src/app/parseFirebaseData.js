import { db } from "../../firebaseConfig";
import { collection, getDocs, where } from "firebase/firestore";

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
    const querySnapshot = await getDocs(
      collection(db, "users"),
      where("first_name", "==", userName)
    );

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    let imageUrl = null;
    querySnapshot.forEach((doc) => {
      imageUrl = doc.data().image_urls; // Assuming image_urls is a string or an array
    });

    return imageUrl;
  } catch (error) {
    console.error("Error retrieving user image:", error);
    return null;
  }
};
