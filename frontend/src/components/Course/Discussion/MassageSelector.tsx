import React, { useState } from "react";
import { MessageCircle, ChevronRight, User, Users } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "@headlessui/react";
type Visibility = "private" | "all";

interface MessageSendSelectorProps {
  onSend: (visibility: Visibility) => void;
  disabled?: boolean;
}

const MessageSendSelector = ({
  onSend,
  disabled = false,
}: MessageSendSelectorProps) => {
  const [visibility, setVisibility] = useState<Visibility>("all");

  const options = {
    private: {
      label: "Private",
      icon: User,
      color: "blue",
    },
    all: {
      label: "All",
      icon: Users,
      color: "green",
    },
  };

  const currentOption = options[visibility];
  const IconComponent = currentOption.icon;

  return (
    <div className="flex">
      <button
        onClick={() => onSend(visibility)}
        disabled={disabled}
        className={`flex items-center px-4 py-2 text-white rounded-l ${
          currentOption.color === "blue"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <MessageCircle size={18} className="mr-2" />
        {currentOption.label}
      </button>
      <Popover>
        <PopoverTrigger>
          <button
            type="button"
            className={`px-2 py-3 text-white border-l border-white/20 rounded-r ${
              currentOption.color === "blue"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0 absolute">
          <div className="z-40  flex flex-col right-32 bottom-12 absolute">
            {Object.entries(options).map(([key, option]) => {
              const OptionIcon = option.icon;
              return (
                <button
                  key={key}
                  type="button"
                  className={`flex items-center px-4 py-2 text-left bg-gray-100 hover:bg-blue-200${
                    visibility === key ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setVisibility(key as Visibility)}
                >
                  <OptionIcon className="z-40 mr-2 h-4 w-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MessageSendSelector;
