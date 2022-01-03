import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

import React, { Component } from 'react'

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
           await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (    
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to <Link to='/'>Chatty</Link>
                    </h1>
                    <p>Fill in the form below to create an account.</p>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type="submit">Sign up</button>
                    </div>
                    <hr />
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        )
    }
}

export default Signup;
