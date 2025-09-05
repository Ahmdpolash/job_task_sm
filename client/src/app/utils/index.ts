export const getLevelColor = (level: string) => {
  switch (level) {
    case "A1":
      return "bg-blue-100 text-blue-800";
    case "A2":
      return "bg-indigo-100 text-indigo-800";
    case "B1":
      return "bg-purple-100 text-purple-800";
    case "B2":
      return "bg-pink-100 text-pink-800";
    case "C1":
      return "bg-orange-100 text-orange-800";
    case "C2":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
