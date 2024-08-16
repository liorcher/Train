/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type GlobalModalContext = {
  showModal: (ModalContent: React.FC<any>, modalProps?: object) => void;
  hideModal: () => void;
  store: unknown;
};

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const [store, setStore] = useState<{ ModalContent: React.FC | null; modalProps: object }>({
    ModalContent: null,
    modalProps: {},
  });
  const { ModalContent, modalProps } = store;

  const showModal = (ModalContent: React.FC<any>, modalProps: object = {}) => {
    setStore({
      ...store,
      ModalContent,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      ModalContent: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if (!ModalContent) {
      return null;
    }
    return ModalContent ? <ModalContent {...modalProps} /> : null;
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
