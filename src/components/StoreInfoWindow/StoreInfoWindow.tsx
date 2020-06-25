import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Store } from '../../models/stores'

const useStyles = makeStyles(theme => ({
  title: {
    margin: '0 0 8px'
  },
  list: {
    paddingLeft: 0
  }
}))

interface PropTypes {
  store: Store
}

const StoreInfoWindow: React.FC<PropTypes> = ({ store }) => {
  const classes = useStyles()

  return <div>
      <h4 className={classes.title}>
        {store.name}
      </h4>
      <ul className={classes.list}>
        {store.products.map(p => (
          <li key={p.id}>({p.qnty}) {p.name}</li>
        ))}
      </ul>
    </div>
}

export default StoreInfoWindow
