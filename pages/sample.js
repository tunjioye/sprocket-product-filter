import React from 'react'
import { connect } from 'react-redux'
import { startClock, serverRenderClock } from '../lib/actions/counterActions'
import Examples from '../components/examples'

class SamplePage extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {
      page: 'Sample'
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <Examples />
  }
}

export default connect()(SamplePage)
