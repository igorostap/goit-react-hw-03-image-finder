import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import './styles.css';

export class App extends Component {
  state = {
    galleryImgName: '',
    currentImg: [],
    showModal: false,
  };
  formSubmit = galleryImgName => {
    this.setState({ galleryImgName });
  };
  toggleModal = img => {
    this.setState(prev => ({ showModal: !prev.showModal, currentImg: img }));
  };
  handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) this.toggleModal({});
  };
  handleEsc = evt => {
    if (evt.code === 'Escape') this.toggleModal({});
  };
  render() {
    return (
      <>
        <Searchbar submitForm={this.formSubmit} />
        <ImageGallery
          galleryImgName={this.state.galleryImgName}
          showModal={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            handleOverlayClick={this.handleOverlayClick}
            onEsc={this.handleEsc}
            currentImg={this.state.currentImg}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
