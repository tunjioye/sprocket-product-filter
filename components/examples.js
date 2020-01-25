import { useSelector } from 'react-redux'
import Clock from './clock'
import Counter from './counter'

export default () => {
  const lastUpdate = useSelector(state => state.counter.lastUpdate)
  const light = useSelector(state => state.counter.light)

  return (
    <div>
      <Clock lastUpdate={lastUpdate} light={light} />
      <Counter />
    </div>
  )
}
