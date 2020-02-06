import Immutable, { fromJS } from "immutable";
import React from "react";
import { Field, Form, FormEditStates, Schema, TextEdit } from "..";

export default { title: "TextEdit" };

const initialValue = {
    name: "Waldo"
};

const basicSchema = (
    <Schema>
        <Field
            name="name"
            label="Name"
            placeholder="Enter the thing's name"
            required={false}
            validation={{ type: "string" }}
        />
    </Schema>
);

export const basic = () => {
    const [value, setValue] = React.useState<Immutable.Map<string, any>>(fromJS(initialValue));
    const [hasMissing, setHasMissing] = React.useState<boolean>(false);
    const [hasErrors, setHasErrors] = React.useState<boolean>(false);
    const [editMode] = React.useState<string>(FormEditStates.ALWAYS);

    const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };

    return (
        <div>
            <pre style={{ fontSize: 18 }}>
                <span>Basic form</span>
            </pre>
            <Form
                name="basic"
                formStyle={style}
                schema={basicSchema}
                value={value}
                initialValue={value}
                edit={editMode}
                labelWidth={200}
                // onSubmit={() => console.log("Submit")}
                onChange={(_, value) => setValue(value)}
                onMissingCountChange={(_, missing) => setHasMissing(missing > 0)}
                onErrorCountChange={(_, errors) => setHasErrors(errors > 0)}
            >
                <TextEdit field="name" width={300} />
            </Form>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                <span>{hasMissing ? "has missing" : "no missing"}</span>
                <span style={{ marginLeft: 20 }}>{hasErrors ? "has errors" : "no errors"}</span>
            </pre>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                {JSON.stringify(value.toJS(), null, 3)}
            </pre>
        </div>
    );
};

const initialContact = {
    first_name: "Bob",
    last_name: "Smith"
};

const contactSchema = (
    <Schema>
        <Field
            name="first_name"
            label="First name"
            placeholder="Enter first name"
            required={true}
            validation={{ type: "string" }}
        />
        <Field
            name="last_name"
            label="Last name"
            placeholder="Enter last name"
            required={true}
            validation={{ type: "string" }}
        />
    </Schema>
);

export const validateAsRequired = () => {
    const [value, setValue] = React.useState<Immutable.Map<string, any>>(fromJS(initialContact));
    const [hasMissing, setHasMissing] = React.useState<boolean>(false);
    const [hasErrors, setHasErrors] = React.useState<boolean>(false);
    const [editMode] = React.useState<string>(FormEditStates.ALWAYS);

    const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };

    return (
        <div>
            <pre style={{ fontSize: 18 }}>
                <span>Text edit form with required fields</span>
            </pre>
            <Form
                name="basic"
                formStyle={style}
                schema={contactSchema}
                value={value}
                initialValue={value}
                edit={editMode}
                labelWidth={200}
                // onSubmit={() => console.log("Submit")}
                onChange={(_, value) => setValue(value)}
                onMissingCountChange={(_, missing) => setHasMissing(missing > 0)}
                onErrorCountChange={(_, errors) => setHasErrors(errors > 0)}
            >
                <TextEdit field="first_name" width={300} />
                <TextEdit field="last_name" width={300} />
            </Form>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                <span>{hasMissing ? "has missing" : "no missing"}</span>
                <span style={{ marginLeft: 20 }}>{hasErrors ? "has errors" : "no errors"}</span>
            </pre>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                {JSON.stringify(value.toJS(), null, 3)}
            </pre>
        </div>
    );
};

export const transitionEditStates = () => {
    const [value, setValue] = React.useState<Immutable.Map<string, any>>(fromJS(initialContact));
    const [hasMissing, setHasMissing] = React.useState<boolean>(false);
    const [hasErrors, setHasErrors] = React.useState<boolean>(false);
    const [editMode, setEditMode] = React.useState<string>(FormEditStates.ALWAYS);

    const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };
    const buttonStyleSelected = { color: "black", padding: 10, cursor: "pointer" };
    const buttonStyleUnselected = { color: "#DDD", padding: 10, cursor: "pointer" };
    return (
        <div>
            <pre style={{ fontSize: 18 }}>
                <span>Text edit form with required fields</span>
            </pre>

            <div>
                <pre style={{ fontSize: 12 }}>
                    <span>Select the edit mode</span>
                </pre>
                <span
                    style={
                        editMode == FormEditStates.ALWAYS
                            ? buttonStyleSelected
                            : buttonStyleUnselected
                    }
                    onClick={() => setEditMode(FormEditStates.ALWAYS)}
                >
                    Always
                </span>
                <span
                    style={
                        editMode == FormEditStates.SELECTED
                            ? buttonStyleSelected
                            : buttonStyleUnselected
                    }
                    onClick={() => setEditMode(FormEditStates.SELECTED)}
                >
                    Selected
                </span>
                <span
                    style={
                        editMode == FormEditStates.NEVER
                            ? buttonStyleSelected
                            : buttonStyleUnselected
                    }
                    onClick={() => setEditMode(FormEditStates.NEVER)}
                >
                    Never
                </span>
            </div>

            <Form
                name="basic"
                formStyle={style}
                schema={contactSchema}
                value={value}
                initialValue={value}
                edit={editMode}
                labelWidth={200}
                // onSubmit={() => console.log("Submit")}
                onChange={(_, value) => setValue(value)}
                onMissingCountChange={(_, missing) => setHasMissing(missing > 0)}
                onErrorCountChange={(_, errors) => setHasErrors(errors > 0)}
            >
                <TextEdit field="first_name" width={300} />
                <TextEdit field="last_name" width={300} />
            </Form>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                <span>{hasMissing ? "has missing" : "no missing"}</span>
                <span style={{ marginLeft: 20 }}>{hasErrors ? "has errors" : "no errors"}</span>
            </pre>

            <pre style={{ margin: 20, padding: 10, background: "#F3F3F3", borderRadius: 5 }}>
                {JSON.stringify(value.toJS(), null, 3)}
            </pre>
        </div>
    );
};
