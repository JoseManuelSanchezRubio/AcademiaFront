import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [lableContent, setLabelContent] = useState("¡A estudiar!");
  const [studying, setStudying] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    let intervalId;
    if (studying && minutes == 25) {
      setStudying(false);
      setTime(0);
      setLabelContent("Descanso");
    }
    if (!studying && minutes == 5) {
      setStudying(true);
      setTime(0);
      setLabelContent("¡A estudiar!");
    }
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  const stopAndReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <div>
        <div className="d-flex align-items-center">
          <div onClick={toggle}>Pomodoro</div>
          <span
            id="pomodoro-info"
            onClick={stopAndReset}
            className={
              isRunning
                ? studying
                  ? "text-primary pomodoro-primary"
                  : "text-warning pomodoro-warning"
                : "text-danger pomodoro-danger"
            }
          ></span>
          <Tooltip
            placement="bottom"
            isOpen={popoverOpen}
            target="pomodoro-info"
            toggle={() => {
              setPopoverOpen(!popoverOpen);
            }}
          >
            Terminar
          </Tooltip>
          <span>
            {isRunning && (
              <span className="ms-2 pomodoro-label">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </span>
            )}
          </span>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <label>{lableContent}</label>
          </ModalHeader>
          <ModalBody>
            <div>
              <p className="text-secondary fst-italic small">
                La técnica Pomodoro es un método de gestión de tiempo que
                sugiere trabajar en intervalos de 25 minutos y añadir tiempos de
                descanso de 5 minutos.
              </p>
              <div>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className={
                isRunning
                  ? "me-2 btn btn-danger btn-sm"
                  : "me-2 btn btn-primary btn-sm"
              }
              onClick={startAndStop}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={reset}>
              Reset
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
