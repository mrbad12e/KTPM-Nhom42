import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import ComboCountries from './ComboCountries';
import './App.css';
import MyAppBar from './MyAppBar';
import MyClass from './MyClass';
//import moment from 'moment';
//import MyClasses from './MyClasses';
//import drawer from './drawer';

class App extends React.Component {
	constructor() {
		super();
		this.state = { selectedClass: '', addStudent: false, totalStudents: 10 };
	}

	handleClassChange = (selectedClass) => {
		console.log('App chon: ', selectedClass);
		this.setState({
			selectedClass: selectedClass,
			newStudent: null,
			className: this.state.selectedClass,
		});
	};

	handleAddStudent = () => {
		//console.log('App them sinh vien vao lop: ', this.state.selectedClass);
		this.addNewStudent();
	};

	handleTotalStudents = (totalStudents) => {
		//console.log('handleTotalStudents ', totalStudents);
		this.setState({ totalStudents: totalStudents, newStudent: null });
	};

	addNewStudent = () => {
		//console.log('addNewStudent');
		fetch('https://randomuser.me/api/?results=5')
			.then((res) => res.json())
			.then(
				(data) => {
					//console.log('data', data.results);
					let id = 1;
					const dataWithId = data.results.map((record) => {
						return {
							// id: id++,
							// first: record.name.first,
							id: id++,
							MSSV: record.mssv,
							firstName: record.name.first,
							lastName: record.name.last,
							gender: record.gender,
							//country: record.location.country,
							phone: record.phone,
							email: record.email,
							//dob: moment(record.dob.date).format('DD/MM/YYYY'),
							//picture: record.picture.thumbnail,
						};
					});
					//console.log('dataWithId', dataWithId);
					this.setState({
						newStudent: dataWithId[0],
						className: this.state.selectedClass,
					});
					//formatData: moment(x.Date).format('DD/MM/YYYY'),

				},
				(error) => {
					console.log('error', error);
				}
			);
	}

	render() {
		return (
			<div><MyAppBar
				classes={[{ id: 1, value: 'mot ' }]}
				handleSelectClassChange={this.handleClassChange}
				handleAddStudent={this.handleAddStudent}
				totalStudents={this.state.totalStudents}

			/>
				<br />
				<MyClass
					newStudent={this.state.newStudent}
					className={this.state.selectedClass}
					handleTotalStudents={this.handleTotalStudents}
				/>
			</div>


		);

	}
}
export default App;
