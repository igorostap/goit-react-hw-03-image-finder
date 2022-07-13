import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    galleryImgName: '',
  };
  imgNameChange = evt => {
    this.setState({ galleryImgName: evt.currentTarget.value.toLowerCase() });
  };
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.galleryImgName.trim() === '') {
      toast.error('Введіть імя картинок галереї');
      return;
    }
    this.props.submitForm(this.state.galleryImgName);
    this.setState({ galleryImgName: '' });
  };
  render() {
    const { galleryImgName } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onFormSubmit}>
          <button type="submit" className="SearchFormButton">
            <span className="SearchFormButtonLabel">Search</span>
          </button>

          <input
            className="SearchFormInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={galleryImgName}
            onChange={this.imgNameChange}
          />
        </form>
      </header>
    );
  }
}
