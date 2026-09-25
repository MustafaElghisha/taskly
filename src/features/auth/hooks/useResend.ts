import { useEffect, useState } from "react";

const DURATION_IN_SECONDS = 300;

const useResend = (
  onSubmit: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<boolean | undefined>,
) => {
  const [endTime, setEndTime] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const tick = () => {
      const remainingMs = endTime - Date.now();
      const remaining = Math.max(0, Math.ceil(remainingMs / 1000));

      setSecondsRemaining(remaining);

      if (remaining === 0) {
        clearInterval(intervalId);
      }
    };

    tick();

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  const handleSendReset = async (event?: React.BaseSyntheticEvent) => {
    const success = await onSubmit(event);
    if (success) setEndTime(Date.now() + DURATION_IN_SECONDS * 1000);
  };

  return { secondsRemaining, handleSendReset };
};

export { useResend };
