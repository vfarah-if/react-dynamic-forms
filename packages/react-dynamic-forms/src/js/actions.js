/**
 *  Copyright (c) 2018 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";

export function editAction(enabled, handler) {
    const iconStyle = {
        fontSize: 11
    };
    let editAction = <span />;
    if (enabled) {
        editAction = (
            <span style={{ marginLeft: 5 }} onClick={handler}>
                <i
                    style={iconStyle}
                    className="glyphicon glyphicon-pencil icon edit-action active"
                />
            </span>
        );
    } else {
        editAction = <div />;
    }
    return editAction;
}