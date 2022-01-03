import React, {
    Component
} from 'react'
import { Link } from 'react-router-dom';
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            await signin(this.state.email, this.state.password);
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    async githubSignIn() {
        try {
            await signInWithGitHub();
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    render() {
        return (
            <div>
                <form autoComplete='off'
                    onSubmit={this.handleSubmit}
                >
                    <h1>
                        Login to <Link to='/'>Chatty</Link>
                    </h1>
                    <p>Fill in the form below to login to your account.</p>
                    <div>
                        <input type="email" name="email" placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.email} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </div>
                    <div>
                        {
                            this.state.error ? (
                                <p>{this.state.error}</p>
                            )
                                : null
                        }
                        <button type="submit">Login</button>
                    </div>
                    <hr />
                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    <p>Or</p>
                    <button onClick={this.googleSignIn} type="button">
                        Sign up with Google
                    </button>
                    <button type="button" onClick={this.githubSignIn}>
                        Sign up with GitHub
                    </button>
                </form>
            </div>
        )
    }
}

export default Login;