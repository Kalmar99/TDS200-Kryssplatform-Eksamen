import { sign } from 'crypto';
import React from 'react'
import { useAuth } from 'react-nhost';
import { Redirect, Route } from 'react-router-dom';
import MyPage from '../pages/MyPage';
import { auth } from '../utils/nhost';

/* Copied from  Lecture 9  */

interface ProtectedRoute {
    component: React.FC;
    path: string;
    exact: boolean
}

const ProtectedRoute = ({component,path,exact} : ProtectedRoute) => {

    const { signedIn } = useAuth()

    return signedIn ? 
    <Route path ={path} component={component} exact={exact} /> :
    <Redirect to="/login" />
}

export default ProtectedRoute;



  