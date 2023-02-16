import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({loggedIn, ...props}) {
    return (
        <Route>
            {loggedIn ? props.children : <Redirect to="/sign-in" />}
        </Route>
    )

}

export default ProtectedRoute;