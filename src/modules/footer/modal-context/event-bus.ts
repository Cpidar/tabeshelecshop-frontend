
type ModalEventHandler = (payload: boolean) => void;

type ToggleModalEventBus = {
  emitModalOpen: (payload: boolean) => void;
  handler: ModalEventHandler;
  registerCartAddHandler: (handler: ModalEventHandler) => void;
};

export const toggleModalEventBus: ToggleModalEventBus = {
    emitModalOpen(payload: boolean) {
    this.handler(payload);
  },

  handler: () => {},

  registerCartAddHandler(handler: ModalEventHandler) {
    this.handler = handler;
  },
};
