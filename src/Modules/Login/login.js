import React from "react";
import fire from '../../fire';
import { withRouter } from "react-router";

const Login = ({ history: { push } }) => {
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    //if user is already authenticated then it will redirected to dashboard.
    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            push('/calculator')
        }
    }, [])

    // This funciton will after click on submit button.
    const handleLogin = (e) => {
        e.preventDefault()
        fire.auth().signInWithEmailAndPassword(emailAddress, password).then(res => {
            localStorage.setItem('user', res.user.email)
            push('/calculator')
        }).catch(err => console.log(err, 'geterr'))
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => handleLogin(e)}>Submit</button>

                </form>
            </div>
        </div>
    );

}
export default withRouter(Login);