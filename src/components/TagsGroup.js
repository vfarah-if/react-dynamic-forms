/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Group from "./Group";
import TagsEdit from "./TagsEdit";

/**
 * Wraps the tags editor widget
 */
export default React.createClass({
    displayName: "TagsGroup",
    render() {
        const { attr, ...others } = this.props;
        return (
            <Group attr={attr}>
                <TagsEdit {...others} />
            </Group>
        );
    }
});

