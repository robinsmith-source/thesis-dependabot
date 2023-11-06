import { Duration } from "luxon";

export default function DurationDisplay({ duration }: { duration: number }) {
  const durationObj = Duration.fromMillis(duration);

  return <span>{durationObj.toHuman({ compactDisplay: "short" })}</span>;
}
