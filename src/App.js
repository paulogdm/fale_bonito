import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import Listitems from './screens/List'
import Form from './screens/Form'
import Container from './Container'

const App = () => (
	<Router>
		<Container>
			<Switch>
				<Route path='/list' component={Listitems} />
				<Route path='/add' component={Form} />
				<Route path='/' exact component={Listitems} />
			</Switch>
		</Container>
	</Router>
)

export default App
