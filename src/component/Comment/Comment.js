import React, { Component } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Container,
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardLink,
    CardTitle,
    CardSubtitle
} from 'reactstrap'
import axios from 'axios'
import auth from '../../service/index'


export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataComment: ''
        }

    }
    getData = e => {
        const data = {
            id: this.props.courseId
        }
        // console.log('asdasdasdasdasd : ' , data);s
        axios.post(`http://localhost:3013/z-api/comment/eachcourse`, data).then(res => {
            console.log('data Comment  : ', res)
            const { data } = res
            //    console.log('data Comment : ', data[0])
            this.setState({ data })
        })


    }

    componentDidMount() {
        this.getData()
    }
    render() {
        const { data } = this.state
        const { courseId } = this.props
        return (
            <div>
                <Row>
                    <Col md={{ size: 6, offset: 3 }} className="contact mt-5 mb-5">
                        asdsads
                        {/* {data} */}
				{courseId}
                    </Col>
                </Row>
            </div>
        )
    }
}
