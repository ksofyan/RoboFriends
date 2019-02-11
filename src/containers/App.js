import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import {setSearchField, requestRobots} from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchField,
		robots: state.robots,
		isPending: state.isPending,
		error: state.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange:(event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())	
	}
}


class App extends Component{

	componentDidMount () {
		this.props.onRequestRobots();	
	}



	render() {
		const {searchField, onSearchChange,robots, isPending} = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		 return isPending? // or you can write in as (robots.length === 0) would mean the same thing
			<h1> Loading </h1>:
		(
		<div className ='tc'>
			<h1 className ='f1'> RoboFriends</h1>
			<SearchBox searchChange ={onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots} />
				</ErrorBoundry>
			</Scroll>
		</div>
			);
		

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

