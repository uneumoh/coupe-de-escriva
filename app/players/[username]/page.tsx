import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/serverApp"; // Ensure you are using a server instance of Firebase
import PlayerModal from "@/components/PlayerModal"; // Import the client component

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
