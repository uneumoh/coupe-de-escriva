import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "@/firebase/clientApp";
import PlayerModal from "@/components/Players/playermodal";

const db = getFirestore(firebase);
export async function generateStaticParams() {
  const playersCollection = collection(db, "players");
  const playersSnapshot = await getDocs(playersCollection);

  return playersSnapshot.docs.map((doc) => ({
    username: doc.id,
  }));
}

export default function PlayerPage({
  params,
}: {
  params: { username: string };
}) {
  return <PlayerModal username={params.username} />;
}
