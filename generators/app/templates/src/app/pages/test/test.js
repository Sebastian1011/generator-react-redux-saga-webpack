import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { jumpTo } from  '../../../actions/auth';
import { withRouter } from 'react-router-dom';

class TestPage extends Component {
    constructor(props){
        super(props);
        this.changeUrl = this.changeUrl.bind(this);
    }

    changeUrl(){
        console.log(this.props.history);
        this.props.history.push('/about')
    }

    render(){
        return(
            <div>
                <span> this is test page </span>
                <button onClick={this.changeUrl}>jump</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};
export default connect(mapStateToProps, {
    jumpTo
})(TestPage);
