import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import PropTypes from 'prop-types'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {
                email: '',
                password: ''
            },
            loading: false,
            error: {}
        }
    }

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }

    handleSubmit = () => {
        const error = this.validate(this.state.data)
        this.setState({error})
        if (Object.keys(error).length === 0) {
            this.setState({loading: true})
            this.props.submit(this.state.data)
            .catch(err => this.setState({error : err.response.data.error, loading: false}))
        }
    }

    validate = (data) => {
        const error = {}
        if(!Validator.isEmail(data.email)) error.email = 'Invalid email'
        if (!data.password) error.password = "This can't be blank"
        return error
    }

    render() {

        const { data, error, loading } = this.state

        return (
            <Form onSubmit={this.handleSubmit} loading={loading}>
                {error.global && 
                <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{error.global}</p>
                </Message>
                }
                <Form.Field error={!!error.email}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={data.email} onChange={this.onChange} />
                    {error.email && <InlineError text={error.email}/>}
                </Form.Field>
                <Form.Field error={!!error.password}>
                    <label htmlFor='password'>Email</label>
                    <input type='password' id='password' name='password' value={data.password} onChange={this.onChange} />
                    {error.password && <InlineError text={error.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.string.isRequired
}

export default LoginForm
