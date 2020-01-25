import React from 'react'
import { connect } from 'react-redux'

class IndexPage extends React.Component {
  render() {
    return (
      <>
        <h1 className="align-center">Welcome</h1>
      </>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
