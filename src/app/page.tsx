import { CandidatesList } from "@/components/CandidatesList";
import candidates from "../data/fakeCandidates.json";

export default function Home() {
  return (
    <div>
      <div>
        <CandidatesList candidates={candidates} />
      </div>
    </div>
  );
}
