import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { Timeline } from 'antd';
import { List, Avatar, Space } from 'antd';
import React from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { appendStrUrl } from './StrApi';


const { Meta } = Card;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

function Bio({bio}) {
    console.log(bio)
    let bioLines = bio.match(/.{1,40}/g)
    for (let i = 0; i < bioLines.length; i++) {
        bioLines[i] = <p>{bioLines[i]}</p>
    }
    return (
        <>
        {bioLines}
        </>
    )
}

function SplitTimeLine({timeLine}) {
    let tls = []
    timeLine.forEach((tl) => {
        tls.push(
            <Timeline.Item>
                {tl.title} <br/> {tl.time} <br />
                <p style={{opacity: '0.6'}}> {tl.desc} </p>
            </Timeline.Item>
        )
    })
    return tls;
}

function getProfileData(item) {
    const attr = item.data.attributes
    const tl = []
    let tlLimit = 5;
    if (attr.blogs.data.length < tlLimit) {
        tlLimit = attr.blogs.data.length
    }
    for (let i = 0; i < tlLimit; i++) {
        tl.push({
            'title': attr.blogs.data[i].attributes.title,
            'desc': attr.blogs.data[i].attributes.description,
            'time': attr.blogs.data[i].attributes.createdAt.split('T')[0],
        })
        
    }
    return {
        avatar: appendStrUrl(attr.avatar.data.attributes.url),
        first_name: attr.first_name,
        last_name: attr.last_name,
        timeLine: tl,
        bio: attr.bio,
    }
}

function Profile({item}) {
    const {
        avatar,
        first_name,
        last_name,
        bio,
        timeLine,
    } = getProfileData(item);

    const colStyle = {
        minWidth:'30%',
        padding:'10px',
    }
    const cardStyle = {
        height: '100%'
    }
    return (
        <div style={{
            marginLeft:'100px',
            marginRight:'30px',
            marginTop:'5%'
        }}>
             <Row>
                <Col
                    style={colStyle}  
                >
                    <Card
                        style={cardStyle}
                        cover={<img src={avatar} />}>
                    </Card>
                </Col>
                <Col 
                    style={colStyle}  
                >
                    <Card
                        style={cardStyle}
                    >
                        <Card
                            
                            bordered={false}
                            // title={title}
                        >
                            <h2>last_name</h2>
                            <h5>first_name</h5>
                            {/* <IconText icon={LikeOutlined} text={likes} key="list-vertical-like-o" /> */}
                        </Card>
                        <Card  bordered={false}>
                            <Bio bio={bio} />
                        </Card>
                        
                    </Card>
                </Col>
                <Col
                    style={colStyle}  
                >
                    <Card 
                        style={cardStyle}>
                        <Timeline>
                            <SplitTimeLine timeLine={timeLine} />
                        </Timeline>
                    </Card>
                </Col>
            </Row>
   
        </div>
    )   
}

export default Profile