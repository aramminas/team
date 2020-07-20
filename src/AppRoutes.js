import React, {Suspense, lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

/* main components */
const Home = lazy(() => import("./components/Home/Home"))
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs"))
const SignUp = lazy(() => import("./components/SignUpIn/SignUp"))
const SignIn = lazy(() => import("./components/SignUpIn/SignIn"))
const Main = lazy(() => import("./components/Main/Main"))
const Topics = lazy(() => import("./components/Topics/Topics"))
const Projects = lazy(() => import("./components/Projects/Projects"))
const Teams = lazy(() => import("./components/Teams/Teams"))
const UserProfile = lazy(() => import("./components/Users/UserProfile"))

/* not found component */
const NotFound = lazy(() => import("./components/NotFound/NotFound404"))

function AppRoutes(){

    return (
        <Suspense fallback={<div className={"main-loader"}><Loader type="Triangle" color="#0057ff" height={100} width={100}/></div>}>
            <Switch>
                {/* main routes */}
                <Route path="/" exact={true} component={Home}/>
                <Route path="/contact-us" component={ContactUs}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/main" component={Main}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/projects" component={Projects}/>
                <Route path="/teams" component={Teams}/>
                <Route path="/user-profile" component={UserProfile}/>

                <Route path='*' exact={true} component={NotFound} />
            </Switch>
        </Suspense>
    )
}

export default AppRoutes
