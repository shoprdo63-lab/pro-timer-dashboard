import { useEffect, useRef } from 'react';
import { PRECISION_WORKER_CODE } from '../constants';

export const useWorkerTimer = (isRunning: boolean, callback: () => void, workerCode: string = PRECISION_WORKER_CODE) => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    workerRef.current.onmessage = (e) => {
      if (e.data === "tick") {
        callback();
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerCode, callback]);

  useEffect(() => {
    if (isRunning) {
      workerRef.current?.postMessage("start");
    } else {
      workerRef.current?.postMessage("stop");
    }
  }, [isRunning]);
};