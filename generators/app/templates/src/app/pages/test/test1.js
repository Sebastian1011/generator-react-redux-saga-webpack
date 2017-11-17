import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { jumpTo } from  '../../../actions/auth';
import { withRouter } from 'react-router-dom';

class TestPage1 extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
                <span> this is test page about </span>
                <button onClick={()=> this.props.jumpTo('/#/')}>jump</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};
export default withRouter(connect(mapStateToProps, {
    jumpTo
})(TestPage1));
