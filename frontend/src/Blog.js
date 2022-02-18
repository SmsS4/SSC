import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { Timeline } from 'antd';
import { List, Avatar, Space } from 'antd';
import React from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { appendStrUrl } from './StrApi';

function getMediaUrl(media) {
    return media.attributes.formats.small.url;
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
        time: attrs.publishedAt,
        blocks: blocks,
    }
}

function BlogPost({item}) {
    const {
        blog_title,
        time,
        blocks,
    } = getBlogData(item);

    // console.log(getMediaUrl(blocks[1].media.data[0]))
    // TODO: render blog data
    return (
        <div>
            سلام
        </div>
    )
}

export default BlogPost