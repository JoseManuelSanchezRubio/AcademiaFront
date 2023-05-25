import { Modal, ModalBody, ModalHeader, Tooltip, Progress } from "reactstrap";
import { useState, useEffect } from "react";
import ReactHowler from "react-howler";

export default function Pomodoro() {
  const [lableContent, setLabelContent] = useState("¡A estudiar!");
  const [studying, setStudying] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const [modal, setModal] = useState(false);
  const [tune, setTune] = useState("src/assets/to_study.mp3");
  const [playHowler, setPlayHowler] = useState(false);

  const toggle = () => setModal(!modal);

  const [popoverOpen, setPopoverOpen] = useState(false);
  console.log();
  useEffect(() => {
    let intervalId;
    if (studying && minutes == 25) {
      setStudying(false);
      setTime(0);
      setTune("src/assets/to_break.mp3");
      setPlayHowler(true);
      setLabelContent("Tómate un descanso");
    }
    if (!studying && minutes == 5) {
      setStudying(true);
      setTime(0);
      setTune("src/assets/to_study.mp3");
      setPlayHowler(true);
      setLabelContent("¡A estudiar!");
    }
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    if (time == 200) setPlayHowler(false);
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startAndStop = () => {
    setIsRunning(!isRunning);
    if (time == 0) setPlayHowler(true);
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
          <div>
            <div onClick={toggle}>Pomodoro</div>
            <Progress
              className="pomodoro-progress-navbar position-absolute"
              color={
                isRunning ? (studying ? "primary" : "warning") : "secondary"
              }
              max={studying ? 150000 : 30000}
              value={time}
            />
          </div>
          <span
            id="pomodoro-info"
            onClick={stopAndReset}
            className={
              isRunning
                ? studying
                  ? "pomodoro-primary"
                  : "pomodoro-warning"
                : time == 0
                ? "pomodoro-danger"
                : "pomodoro-secondary"
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
            {time != 0 && (
              <span className="ms-2 pomodoro-label">
                {minutes.toString().padStart(2, "0")}
                <span>&nbsp;:&nbsp;</span>
                {seconds.toString().padStart(2, "0")}
              </span>
            )}
          </span>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="modal-header">
            <label>{lableContent}</label>
          </ModalHeader>
          <ModalBody>
            <ReactHowler src={tune} playing={playHowler} />
            <p className="text-secondary fst-italic small">
              La técnica Pomodoro es un método de gestión de tiempo que sugiere
              trabajar en intervalos de 25 minutos y añadir tiempos de descanso
              de 5 minutos.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="fs-4">
                <div>
                  <span className="pomodoro-minutes">
                    {minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="mx-2">:</span>
                  <span className="pomodoro-seconds">
                    {seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <Progress
                  className="pomodoro-progress"
                  animated={isRunning}
                  striped
                  color={
                    isRunning ? (studying ? "primary" : "warning") : "secondary"
                  }
                  max={studying ? 150000 : 30000}
                  value={time}
                />
              </div>
              <div>
                <button
                  className={
                    isRunning
                      ? "me-2 btn btn-danger btn-sm pomodoro-button"
                      : "me-2 btn btn-primary btn-sm pomodoro-button"
                  }
                  onClick={startAndStop}
                >
                  {isRunning ? "Parar" : time == 0 ? "Empezar" : "Renaudar"}
                </button>
                <button
                  className="btn btn-secondary btn-sm pomodoro-button"
                  onClick={reset}
                >
                  Reiniciar
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
