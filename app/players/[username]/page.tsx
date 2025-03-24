import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase from "@/firebase/clientApp";
import PlayerModal from "@/components/Players/playermodal";

const db = getFirestore(firebase);

export default async function PlayerPage({
  params,
}: {
  params: { username: string };
}) {
  const playersSnapshot = await getDocs(collection(db, "players"));
  const playerDoc = playersSnapshot.docs.find(
    (doc) => doc.id === params.username,
  );

  const player = playerDoc ? playerDoc.data() : null;

  if (!player) {
    return <h1>Player Not Found</h1>;
  }

  return <PlayerModal username={params.username} />;
}
