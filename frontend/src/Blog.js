import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { Timeline } from 'antd';
import { List, Avatar, Space } from 'antd';
import React from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { appendStrUrl } from './StrApi';


const { Meta } = Card;

function getMediaUrl(media) {
    return appendStrUrl(media.attributes.formats.small.url);
}

function getBlogData(item) {
    console.log("Blog post data... here:");
    console.log(item);
    const attrs = item.data.attributes;
    const blocks = [];

    for (const block of attrs.blocks) {
        const myobj = {'text': '', 'media': []};
        myobj.text = block.text;
        if (block.media.data != null) {
            for (const media of block.media.data) {
                myobj.media.push(getMediaUrl(media));
            }
        }
        blocks.push(myobj);
    }

    return {
        blog_title: attrs.title,
        description: attrs.description,
        time: attrs.publishedAt,
        blocks: blocks,
    }
}

function BlogPost({item}) {
    const {
        blog_title,
        description,
        time,
        blocks,
    } = getBlogData(item);

    const colStyle = {
        minWidth:'90%',
        padding:'10px',
    }
    const cardStyle = {
        height: '100%',
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
                            title={blog_title}
                        >
                            <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
                            <br/><br/>
                            <Meta description={description} />
                            <br/>
                            {blocks.map(function(d, idx){
                                return (
                                    <div key={idx}>
                                        <Card bordered={false} style={cardStyle}>
                                            {d.text}
                                        </Card>
                                        {d.media.map(function(d2, idx2){
                                            return (
                                                <div key={idx2}>
                                                    {/* TODO: support Media like movie and image: component*/}
                                                    <img src={d2} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </Card>
                </Col>
            </Row>
        </div>
    )   
}

export default BlogPost;