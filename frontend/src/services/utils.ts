// utils.ts

export const mapVisibility = (visibility: string): "all" | "teachers" => {
    switch (visibility) {
      case "1":
        return "all";
      case "2":
        return "teachers";
      default:
        return "all"; // default to 'all' if undefined
    }
  };
  