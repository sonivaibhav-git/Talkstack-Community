import { useState } from "react";

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
    <div className="flex w-fit p-1 items-center gap-3 border-2 rounded-xl border-neutral-400">
      <button
        onClick={handleUpvote}
        className={`btn ${
          voteType === "up" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        ▲
      </button>

      <span className="font-semibold text-lg">{count}</span>

      <button
        onClick={handleDownvote}
        className={`btn ${
          voteType === "down" ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        ▼
      </button>
    </div>
  );
};

export default VoteButtons;
