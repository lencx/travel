import React, { FC, memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import 'wicg-inert';

import Portal from '@comps/Portal';

import './index.scss';

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, open, onClose, className }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => {
        setActive(open);
        (document as any).querySelector('#root').setAttribute('inert', 'true');
      }, 0);
    }

    return () => {
      (document as any).querySelector('#root').removeAttribute('inert');
    };
  }, [open]);

  const handleClose = () => {
    onClose && onClose();
    setActive(false);
  };

  return open || active ? (
    <Portal className={clsx('modal', className)}>
      <div className={clsx('modal-container', { active: active && open })}>
        <i className="close" onClick={handleClose} />
        <div className="modal-content">
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

Modal.defaultProps = {
  open: false,
};

export default Modal;
