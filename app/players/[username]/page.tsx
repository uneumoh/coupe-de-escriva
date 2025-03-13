import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "@/firebase/clientApp";
import PlayerModal from "@/components/Players/playermodal";

const db = getFirestore(firebase);

export async function generateStaticParams() {
  const playersCollection = collection(db, "players"); // Replace with your Firestore collection name
  const playersSnapshot = await getDocs(playersCollection);

  const paths = playersSnapshot.docs.map((doc) => ({
    username: doc.id, // Assuming username is stored as the document ID
  }));

  return paths; // Next.js will pre-render these paths
}

// Make the page function async so the types match
export default async function PlayerPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return <PlayerModal username={(await params).username} />;
}
