import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/custom.css'

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid={true} >
            <h2 className="uppercase logo text-white pt-3">Weather App</h2>
        </Container>
      </Fragment>
    )
  }
}

export default Header