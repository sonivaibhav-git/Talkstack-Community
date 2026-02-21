import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";

type VoteProps = {
  voteCount: number;
};

const VoteButtons = ({ voteCount }: VoteProps) => {
  const [count, setCount] = useState<number>(voteCount);
  const [voteType, setVoteType] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (voteType === "up") {
      setCount(count - 1);
      setVoteType(null);
    } else if (voteType === "down") {
      setCount(count + 2);
      setVoteType("up");
    } else {
      setCount(count + 1);
      setVoteType("up");
    }
  };

  const handleDownvote = () => {
    if (voteType === "down") {
      setCount(count + 1);
      setVoteType(null);
    } else if (voteType === "up") {
      setCount(count - 2);
      setVoteType("down");
    } else {
      setCount(count - 1);
      setVoteType("down");
    }
  };

  return (
    <div className="flex px-3 py-2 w-fit  items-center justify-between  border-2 rounded-xl border-neutral-400">
      <PrimaryBtn
        onClick={handleUpvote}
      >
        ▲
      </PrimaryBtn>

      <span className="font-semibold text-md">{count || 0}</span>

      <button
        onClick={handleDownvote}
        className={`btn`}
      >
        ▼
      </button>
    </div>
  );
};

export default VoteButtons;
