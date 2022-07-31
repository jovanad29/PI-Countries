import './index.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import FormActivity from './components/FormActivity';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/home' component={Home} exact />
        <Route path='/country/:id' render={(props) => <CountryDetail {...props} />} />
        <Route path='/activity/create' component={FormActivity} />
        <Route path='/' component={LandingPage} exact />
      </Switch>
    </div>
  )
}

export default App;
