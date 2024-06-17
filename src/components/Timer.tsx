import { useTimer } from "react-timer-hook";
interface MyTimerProps {
  expiryTimestamp: Date;
}

function MyTimer({ expiryTimestamp }: MyTimerProps) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      window.location.reload();
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tiempo Restante</h1>
      <p>Tiene 45min para responder el formulario</p>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 20);
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
