import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getCart} from '../store'

class Navbar extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCart()
    }
  }

  render() {
    const {handleClick, isLoggedIn, cart} = this.props
    //we want the quantity of every item in cart
    const cartQuantity = cart.reduce((accum, current) => {
      return accum + current.quantity
    }, 0)
    return (
      <div>
        <div className="text text-1">B</div>
        <div className="text text-2">u</div>
        <div className="text text-3">b</div>
        <div className="text text-4">b</div>
        <div className="text text-2">l</div>
        <div className="text text-1">y</div>
        <div className="text text-2">S</div>
        <div className="text text-3">o</div>
        <div className="text text-4">r</div>
        <div className="text text-2">t</div>
        {/* <h1 id="title">BubblySort</h1> */}
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart ({cartQuantity})</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart ({cartQuantity})</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
