import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import SubmitFields from './SubmitFields'
import * as PostsAPI from '../API/PostsAPI';

import FontAwesome from 'react-fontawesome'
import {
    Container
} from 'reactstrap';



const CreatePost = ({ goBack, goTo }) => {

    const createPost = inputFields => {
        let inputFieldsEntries = Object.entries(inputFields)
        let title = inputFields.title.value
        let body = inputFields.body.value
        let author = inputFields.author.value
        let category = inputFields.category.value


        PostsAPI.createPost(title, body, author, category).then( response => {
            goTo(`/${category}`)
        })
    }

    const inputFields = {
        title: {
            state: null,
            value: '',
            type: 'text'
        },
        body: {
            state: null,
            value: '',
            type: 'textarea',
        },
        author: {
            state: null,
            value: '',
            type: 'text',
        },
        category: {
            state: null,
            value: '',
            type: 'select',
        },
    }

    const backBtn = { cursor: 'pointer', color: 'gray', marginLeft: '1em', marginTop: '0.4em' }
    const containerStyle = { width: '65%' }

    return (
        <div className="create-post">
            <span className="left" onClick={ goBack }>
                <FontAwesome name="angle-left" size="3x" style={ backBtn } />
            </span>

            <p className="title unselectable"> Create a Comment </p>

            <Container style={ containerStyle }>
                <SubmitFields
                    inputFieldsProps={ inputFields }
                    onEdit={ (inputFields) => createPost(inputFields)}
                    submitBtnText="Create Comment"
                />
            </Container>

        </div>
    )




}


export default CreatePost