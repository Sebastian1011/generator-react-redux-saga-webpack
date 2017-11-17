import React from 'react';
import { Tree } from 'antd';
import _ from 'lodash';

const TreeNode = Tree.TreeNode;

class UserTree extends React.Component {
    state = {
        checkedKeys: [],
    };

    constructor(props){
        super(props);
    }

    onCheck = (newCheckedKeys, e) => {
        let checkedKeys;
        if(!e.node.props.isLeaf && e.node.props.children) {
            const childrenKeys = e.node.props.children.map(child => child.key);
            if(!e.node.props.checked) {
                //父节点被选中，则旗下子节点全被选中
                checkedKeys = _.uniq(newCheckedKeys.concat(childrenKeys));
            } else {
                //父节点被取消选择，则旗下子节点全被取消
                checkedKeys = _.filter(newCheckedKeys, key => childrenKeys.indexOf(key) === -1);
            }
        } else {
            checkedKeys = newCheckedKeys;
        }
        const userIds = _.filter(checkedKeys.checked || checkedKeys, id => this.props.data.map(checkedUser => checkedUser.key).indexOf(id) === -1);

        this.props.onChange(userIds);
        this.setState({ checkedKeys });
    };

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item} >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });
    };

    render() {
        return (
            <Tree checkable
                  checkStrictly
                  onCheck={this.onCheck}
                  checkedKeys={this.state.checkedKeys}
            >
                {this.renderTreeNodes(this.props.data)}
            </Tree>
        );
    }
}

export default UserTree;