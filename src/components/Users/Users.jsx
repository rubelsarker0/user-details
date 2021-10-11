import React, { useEffect, useState } from 'react';
import User from '../User/User';
import './Users.css';
import UserDetails from '../UserDetails/UserDetails';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [userDetails, setUserDetails] = useState();

	const getUserData = async () => {
		try {
			const apiUrl = `https://jsonplaceholder.typicode.com/users`;
			const response = await fetch(apiUrl);
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getUserDetails = async (id) => {
		const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		setUserDetails(data);
	};

	const detailsBtnHandler = (id) => {
		getUserDetails(id);
		console.log('I am clicked', id);
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<main>
			<h1 className="user-found">{`User found: ${users.length}`}</h1>
			{userDetails ? <UserDetails userDetails={userDetails} /> : ''}
			<div className="user-container">
				{users.map((user) => (
					<User
						key={user.id}
						user={user}
						detailsBtnHandler={detailsBtnHandler}
					/>
				))}
			</div>
		</main>
	);
};

export default Users;
