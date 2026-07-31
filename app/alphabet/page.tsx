import { PresentationEngine } from "@/components/PresentationEngine";
import { alphabet } from "@/data/alphabet";

export const metadata = {
  title: "Alphabet Learning | Magic Kids World",
  description: "Learn your ABCs with fun colors and sounds!",
};

export default function AlphabetPage() {
  return (
    <PresentationEngine
      items={alphabet}
      title="Alphabet Learning"
    />
  );
}
