import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    const { onEsc } = this.props;
    document.addEventListener('keydown', onEsc);
  }
  componentWillUnmount() {
    const { onEsc } = this.props;
    document.removeEventListener('keydown', onEsc);
  }

  render() {
    const { currentImg, handleOverlayClick } = this.props;
    return createPortal(
      <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">
          <img src={currentImg.largeImageURL} alt="largeImageURL" />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.proptype = {
  currentImg: PropTypes.object,
  handleOverlayClick: PropTypes.func,
  onEsc: PropTypes.func,
};
