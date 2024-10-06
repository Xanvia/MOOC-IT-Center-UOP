// Notifications.tsx
import React, { useState } from "react";
import MainChat from "./MainChat"; // Adjust the path as necessary
import { Discussion } from "../types"; // Define a types file or adjust accordingly
import ThreadView from "./Thread";

export default function Notifications() {
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Discussion | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {selectedDiscussion ? (
        <ThreadView
          parentMessage={selectedDiscussion}
          onBack={() => setSelectedDiscussion(null)}
        />
      ) : (
        <MainChat
          onThreadSelect={(discussion) => setSelectedDiscussion(discussion)}
        />
      )}
    </div>
  );
}
