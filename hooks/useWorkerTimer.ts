import { useEffect, useRef } from 'react';
import { PRECISION_WORKER_CODE } from '../constants';

export const useWorkerTimer = (isRunning: boolean, callback: () => void, workerCode: string = PRECISION_WORKER_CODE) => {
  const workerRef = useRef<Worker | null>(null);
  const callbackRef = useRef(callback);

  // Keep the callback ref updated so the worker always calls the latest version
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    worker.onmessage = (e) => {
      if (e.data === "tick") {
        callbackRef.current();
      }
    };

    // Initialize state
    if (isRunning) {
      worker.postMessage("start");
    }

    return () => {
      worker.terminate();
    };
  }, [workerCode]); // Only re-create worker if code changes, NOT when callback changes

  // Handle start/stop dynamically without recreating worker
  useEffect(() => {
    if (workerRef.current) {
      if (isRunning) {
        workerRef.current.postMessage("start");
      } else {
        workerRef.current.postMessage("stop");
      }
    }
  }, [isRunning]);
};