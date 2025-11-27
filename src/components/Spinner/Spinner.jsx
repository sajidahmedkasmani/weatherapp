import React, { Component } from 'react'

class Spinner extends Component {
  render() {
    return (
        <div className='w-10 h-10 border-8 border-black border-t-transparent rounded-full animate-spin spin'></div>
    )
  }
}

export default Spinner