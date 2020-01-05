import React, { Component } from 'react';

import Service from '../../service';

export default class ViewImage extends Component {
  service = new Service();

  state = {
    data: null,
    modalVisible: false,
    modalInfo: null
  }

  componentDidMount() {
    this.service.getImages()
      .then(data => this.setState({ data }));
  }

  openModal = (id) => {
    this.service.getComments(id)
      .then(data => this.setState({
        modalInfo: data,
        modalVisible: true
      }))
  }

  beautifulNumber = (number) => {
    if ((number + '').length === 1) {
      return `0${number}`
    }
    return number
  }

  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${this.beautifulNumber(date.getDate())}.${this.beautifulNumber(date.getMonth() + 1)}.${this.beautifulNumber(date.getFullYear())}`
  }
  
  render() {
    const { data, modalVisible, modalInfo } = this.state
    const pictures = data &&
      <div className="list-images">
        {data.map(({ id, url }) => {
          return (
            <img className="list-images__img"
              onClick={() => this.openModal(id)}
              key={id} src={url} alt={id} />
          )
        })}
      </div>
    const modal = modalVisible &&
      <div className={`overlay`}>
        <div className="modal">
          <img src={modalInfo.url} alt={modalInfo.id} className="modal__image" />
          {console.log(modalInfo.comments.length)}
          <div className="modal__comments">
            {modalInfo.comments.length > 0 ?
              modalInfo.comments.map(({ text, date, id }) => {
                return (
                  <>
                    <div key={id} className="modal__comment">
                      <div className="modal__date">{this.formatDate(date)}</div>
                      <div className="modal__text">{text}</div>
                    </div>
                  </>
                )
              }) : <div className="modal__text">Комментарии отсутствуют.</div>
            }
          </div>
          <div className="modal__form">
            <input type="text" placeholder="Ваше имя" className="modal__input" />
            <input type="text" placeholder="Ваш комментарий" className="modal__input" />
            <button className="modal__button">Оставить комментарий</button>
          </div>
          <div className="modal__close" onClick={() => this.setState({
            modalVisible: false
          })}>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="black" />
              <line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446" stroke="black" />
            </svg>
          </div>
        </div>
      </div>;
    return (
      <>
        {pictures}
        {modal}
      </>
    );
  }

}