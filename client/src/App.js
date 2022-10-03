import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CountryDetail from './components/CountryDetail/CountryDetail';
import FormActivity from './components/FormActivity/FormActivity';
import NotFound from './components/NotFound/NotFound';

function App() {
	return (
		<div className='App' id='app'>
			<Switch>
				<Route path='/home' component={Home} exact />
				<Route path='/country/:id' render={(props) => <CountryDetail {...props} />} />
				<Route path='/activity/create' component={FormActivity} />
				<Route path='/' component={LandingPage} exact />
				<Route path='*' component={NotFound} />
			</Switch>
		</div>
	)
}

export default App;
