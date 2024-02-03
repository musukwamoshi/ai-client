import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChatCompletion } from '../home/ChatCompletion';
// import { Login } from '../authentication/Login';
// import { SignUp } from '../authentication/SignUp';

// import { PasswordReset } from '../authentication/PasswordReset';
import { Embedding } from '../home/Embedding';


function AppRoutes() {
    return (
        <div>

            <Routes>
                {/* <Route path="/sentinel/signup" element={<SignUp />} />
                <Route path="/sentinel/login" element={<Login />} />
                <Route path="/sentinel/password/reset" element={<PasswordReset />} /> */}
                <Route path="/" element={<ChatCompletion />} />
                <Route path="/chat/completion" element={<ChatCompletion />} />
                <Route path="/embedding" element={<Embedding />} />
            </Routes>

        </div>
    );
}

export default AppRoutes;
