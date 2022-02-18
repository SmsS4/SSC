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

const colStyle = {
    minWidth:'90%',
    padding:'10px',
}
const cardStyle = {
    height: '100%',
}

function MediaComp({medias}) {
    return (
        <>
            {medias.map(function(mediaUrl, idx){
                return (
                    <div key={idx}>
                        {/* TODO: support Media like movie and image: component*/}
                        <img src={mediaUrl} />
                    </div>
                )
            })}
        </>
    )
}

function Blocks({blocks}) {
    return (
        <>
            {blocks.map(function(block, idx){
                return (
                    <div key={idx}>
                        <Card bordered={false} style={cardStyle}>
                            {block.text}
                        </Card>
                        <MediaComp medias={block.media} />
                    </div>
                )
            })}
        </>
    )
}

function BlogPost({item}) {
    const {
        blog_title,
        description,
        time,
        blocks,
    } = getBlogData(item);

    return (
        <div style={{
            marginLeft:'160px',
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
                            <Meta description={time} />
                            <br/>
                            <Blocks blocks={blocks} />
                        </Card>
                </Col>
            </Row>
        </div>
    )   
}

export default BlogPost;