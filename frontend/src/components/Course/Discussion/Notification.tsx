import React, { useState } from "react";
import MainChat from "./MainChat";
import { Discussion } from "../types";
import { useGlobal } from "@/contexts/store";
import ThreadView from "./Thread";

export default function Notifications() {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const { userRole } = useGlobal();

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {selectedDiscussion ? (
        <ThreadView
          parentMessage={selectedDiscussion}
          onBack={() => setSelectedDiscussion(null)}
          userRole={userRole || "student"}
        />
      ) : (
        <MainChat
          onThreadSelect={(discussion) => setSelectedDiscussion(discussion)}
        />
      )}
    </div>
  );
}