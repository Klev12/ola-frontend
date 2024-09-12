import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
interface TimerProps {
  expiryTimestamp: Date;
  onExpireFn?: () => void;
}

export default function Timer({ expiryTimestamp, onExpireFn }: TimerProps) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
  });

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      if (onExpireFn) onExpireFn();
    }
  }, [seconds, minutes, onExpireFn]);

  return (
    <div>
      <span>
        Tiempo restante:{" "}
        <span style={{ fontWeight: "bold" }}>
          {minutes}:{seconds}
        </span>
      </span>
    </div>
  );
}
