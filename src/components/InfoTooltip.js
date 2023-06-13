import React, { useEffect } from 'react';
import React from "react";
import fail from '../image/fail.svg';
import success from '../image/success.svg';
import { useLocation } from 'react-router-dom';

const InfoTooltip = (props) => {
  // Диструктуризированная переменная с пропсами
  const {
    isOpen,
    onClose,
    isSuccess
  } = props;

  const path = useLocation().pathname

  const tooltip = () => {
    if (path === '/sign-in' || path === '/sign-up') {
      return isSuccess
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз.";
    }

    if (path === '/mesto') {
      return isSuccess
        ? "Вы успешно авторизовались!"
        : "Что-то пошло не так!";
    }

    return;
  }

  const image = isSuccess
    ? success
    : fail

  // Реализация закрытия нажатием на ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  // Реализация закрытия по оверлею
  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
    return;
  };


  return (
    <section
      onClick={handleOverlayClose}
      className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close-tooltip"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image-tooltip" src={image} alt={"Картинка подсказки"}></img>
        <p className="popup__tooltip">{tooltip()}</p>
      </div>
    </section>
  )
}

export default InfoTooltip;