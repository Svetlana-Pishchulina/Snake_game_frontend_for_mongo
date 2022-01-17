import React, { Component } from 'react'
import styles from './LoginForm.module.css'

class LoginForm extends Component {
  state = {
    nameValue: '',
  }

  handleChangeInput = (e) => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.onFormSubmit({
      name: this.state.nameValue,
    })
    this.setState({
      nameValue: '',
    })
  }

  render() {
    const isButtonDisable = !this.state.nameValue
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Пожалуйста, зарегистрируйтесь!</h2>
        <form className={styles.form} onSubmit={this.onFormSubmit}>
          <input
            className={styles.input}
            onChange={this.handleChangeInput}
            value={this.state.nameValue}
            name="nameValue"
            placeholder="введите свое имя"
          ></input>
          <button
            className={styles.button}
            type="submit"
            disabled={isButtonDisable}
          >
            регистрация
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
