import React, { Component } from 'react'

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, info){
        console.log(err, info)
        this.setState({error: true})
    }

    render(){
        const {error} = this.state
        if(error){
            return <h2>Something went wrong</h2>
        }
        return this.props.children
    }
}

export default ErrorBoundary