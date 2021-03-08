import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {checkout, deleteFromCart} from '../store'
import Alert from 'react-bootstrap/Alert'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // How to prevent form submission with incomplete info??
    //   this.props.checkout(this.state)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: ''
    })
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zipCode
    } = this.state
    const {handleSubmit, handleChange} = this
    const cart = this.props.cart

    const user = this.props.user

    const totalQuantity = cart.reduce((accum, currVal) => {
      return accum + currVal.quantity
    }, 0)

    const totalPrice = []

    cart.forEach(item => {
      const totalPricePerItem = item.price * item.quantity
      totalPrice.push(totalPricePerItem)
    })

    const finalPrice = totalPrice.reduce((accum, currVal) => {
      return accum + currVal
    }, 0)

    console.log('USER', user)

    return (
      <div>
        {cart.map(item => (
          <h4 key={item.id}>
            <img src={item.imageURL} />
            {item.flavor}, quantity:{' '}
            {item.product_orders ? item.product_orders.quantity : item.quantity}
          </h4>
        ))}

        <h4>Total Items in Cart: {totalQuantity}</h4>

        <h4>Total Price: ${finalPrice}</h4>

        <form id="checkout-form" onSubmit={handleSubmit}>
          <div className="shipping">
            {' '}
            Shipping Address:
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={user.id ? user.firstName : firstName}
            />
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={user.id ? user.lastName : lastName}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={user.id ? user.email : email}
            />
            <br />
            <label htmlFor="streetAddress1">Address Line 1: </label>
            <input
              type="text"
              name="streetAddress1"
              onChange={handleChange}
              value={streetAddress1}
            />
            <label htmlFor="streetAddress2">Address Line 2: </label>
            <input
              type="text"
              name="streetAddress2"
              onChange={handleChange}
              value={streetAddress2}
            />
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              value={city}
            />
            <label htmlFor="state">State: </label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              value={state}
            />
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={zipCode}
            />
            <br />
          </div>
          <div className="billing">
            {' '}
            Billing Address:
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={user.id ? user.firstName : firstName}
            />
            <br />
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={user.id ? user.lastName : lastName}
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={user.id ? user.email : email}
            />
            <br />
            <label htmlFor="streetAddress1">Address Line 1: </label>
            <input
              type="text"
              name="streetAddress1"
              onChange={handleChange}
              value={streetAddress1}
            />
            <label htmlFor="streetAddress2">Address Line 2: </label>
            <input
              type="text"
              name="streetAddress2"
              onChange={handleChange}
              value={streetAddress2}
            />
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              value={city}
            />
            <label htmlFor="state">State: </label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              value={state}
            />
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={zipCode}
            />
          </div>
        </form>
        <Link to="/confirmation">
          <button
            className="stylizedButton"
            type="submit"
            onClick={() => this.props.checkingOut()}
          >
            Place your order
          </button>
        </Link>
        <Alert variant="secondary">
          Sure you don't want any more
          <Alert.Link href="/products"> seltzer</Alert.Link>?
        </Alert>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  checkingOut: () => dispatch(checkout())
})

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatch)(Checkout)
