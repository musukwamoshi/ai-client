import React from 'react';
// import { Loader } from './components/common/Loader';
import AppRoutes from './components/routes/Routes';
// import { get } from './utils/api';
// import { AuthContext, AuthContextData, Session } from './utils/context/auth';
// import { useEffectOnce } from './utils/hooks/useEffectOnce';
import { BrowserRouter } from 'react-router-dom';

function App() {
	// // add  session initialization code
	// const [isInitialized, setInitialized] = useState<boolean>(false);
	// const [session, setSession] = useState<AuthContextData>({
	// 	setSession: (newSession: Session) => {
	// 		setSession({ ...session, ...newSession });
	// 	},
	// });

	// useEffectOnce(() => {
	// 	initializeSession();
	// });

	// const initializeSession = async (): Promise<void> => {
	// 	// determine login state
	// 	try {
	// 		const newSession = await get('/sessions');

	// 		setSession({
	// 			...session,
	// 			...newSession,
	// 		});
	// 	} catch (error) {
	// 		console.debug('Not logged in', error);
	// 	} finally {
	// 		setInitialized(true);
	// 	}
	// };

	// if (!isInitialized) {
	// 	return <Loader />;
	// }
	return (
		<>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</>

	);
}

export default App;
