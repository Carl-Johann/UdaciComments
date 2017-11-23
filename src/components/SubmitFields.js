import React, { Component } from 'react';
import * as CategoriesAPI from '../API/CategoriesAPI';
import { setCategories } from '../actions';
import { connect } from 'react-redux';
import {
    FormGroup, ControlLabel, Input,
    FormFeedback, Button
} from 'reactstrap';


class InputFields extends Component {

    state = {
        inputFields: { }
    }

    componentDidMount() {
        let inputFields = this.props.inputFieldsProps
        this.setState({ inputFields })

        CategoriesAPI.getAllCategories().then( categories => {
            // Dispatching to store
            this.props.setCategories({categories})
        })

    }

    handleChange = (event) => {

        let name = event.target.name
        let value = event.target.value
        let state = this.state

        let inputFields = {
            ...state.inputFields,
            [name]: {
                ...state.inputFields[name],
                value
            }
        }

        this.setState({ inputFields })
    }


    isFormValid = () => {
        let inputFieldsEntries = Object.entries(this.state.inputFields)
        let inputFields = this.state.inputFields

        inputFieldsEntries.forEach(([name, value]) => {
            if (value.value.trim() !== "") {
                inputFields = {
                    ...inputFields,
                    [name]: {
                        ...inputFields[name],
                        state: true
                    }
                }
            } else {
                inputFields = {
                    ...inputFields,
                    [name]: {
                        ...inputFields[name],
                        state: false
                    }
                }
            }
        } )

        this.setState({ inputFields })
    }

    cleanFields = () => {
        let inputFieldsEntries = Object.entries(this.state.inputFields)
        let inputFields = this.state.inputFields

        inputFieldsEntries.forEach(([name, value]) => {
                inputFields = {
                    ...inputFields,
                    [name]: {
                        ...inputFields[name],
                        state: null,
                        value: ''
                    }
                }
            }
        )
        this.setState({ inputFields })
    }


    submitForm = () => {
        let inputFieldsEntries = Object.entries(this.state.inputFields)

        if ( inputFieldsEntries.filter(([ name, value ]) => value.value === '' ).length > 0 ) {
            this.isFormValid()
        } else {
            this.cleanFields()
            this.props.onEdit(this.state.inputFields)
        }
    }



    render() {

        const { inputFields } = this.state
        const { goBack, categories, submitBtnText } = this.props
        const { title, body, author } = inputFields

        const titleText = { textTransform: 'capitalize' }
        const backBtn   = { cursor: 'pointer', color: 'gray', marginLeft: '1em', marginTop: '0.4em' }
        const textArea  = { minHeight: '62px' }

        return (
            <div className="edit-modal">
                {Object.entries(this.state.inputFields).map(([ name, value ]) => (
                    value.type === 'text' && (

                    <FormGroup key={ name }>
                        <Input
                            placeholder={ name }
                            name={ name }
                            type={ value.type }
                            valid={ value.state }
                            value={ value.value }
                            onChange={ this.handleChange }
                        />
                        <FormFeedback> <span style={ titleText }> '{ name } '</span> field should not be empty! </FormFeedback>
                    </FormGroup>


                    ) || value.type === 'textarea' && (

                        <FormGroup key={ name }>
                            <Input
                                placeholder={ name }
                                name={ name }
                                type={ value.type }
                                valid={ value.state }
                                value={ value.value }
                                onChange={ this.handleChange }
                            />
                            <FormFeedback> <span style={ titleText }> '{ name }' </span> field should not be empty! </FormFeedback>
                        </FormGroup>

                    ) || value.type === 'select' && name === 'category' && (
                        <FormGroup key={ name }>
                            <Input
                                type={ value.type }
                                valid={ value.state }
                                name={ name }
                                onChange={ this.handleChange }
                                style={ titleText }
                            >
                                <option disabled> Select category... </option>
                                <option>  </option>
                                { categories !== undefined && (categories['categories'] !== undefined && (categories['categories'].map( category => (
                                    <option name={ category.name } key={ category.name }> { category.name } </option>

                                ) )))}
                            </Input>
                            <FormFeedback> <span style={ titleText }> '{ name }' </span> field should not be empty! </FormFeedback>
                        </FormGroup>
                    )
                ))}
                <Button color="success" style={{ width: '100%' }} onClick={ () => this.submitForm() }> { submitBtnText } </Button>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setCategories:   (data) => dispatch(setCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputFields)