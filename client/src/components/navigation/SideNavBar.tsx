import React from 'react';
import { Link } from 'react-router-dom';
// import { post } from '../../utils/api';

export const SideNavBar = () => {
	// const navigate = useNavigate();
	// const handleLogOut = async (e: any): Promise<any> => {
	// 	const response = await post('/logout', {});
	// 	e.preventDefault();
	// 	if (response.success) {
	// 		navigate('/sentinel/ukwingila');
	// 	} else {
	// 		console.log(response);
	// 	}
	// };

	return (
		<>
			<nav className="mt-5 flex-1 px-2 space-y-1">
				<h1 className="text-3xl font-semibold text-white mb-5">
					AITest
				</h1>
				<a
					href="/chat/completion"
					className="bg-indigo-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
					</svg>

					Chat Completion
				</a>

				<Link to="/embedding" className="text-white hover:bg-indigo-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>

					Embedding
				</Link>


				{/* <Link to="#" onClick={handleLogOut}
					className="text-white hover:bg-indigo-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
					</svg>
					Log Out
				</Link> */}

			</nav>
		</>
	);
};
