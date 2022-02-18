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
    // TODO: extract data from 'item' object
    console.log("Blog post data... here:");
    console.log(item);
    const attrs = item.data.attributes;
    const blocks = attrs.blocks;
    // for (const block of blocks) {
    //     console.log(block);
    //     if (block.media.data != null) {
    //         console.log("salam")
    //     } else {
    //         console.log("media nadarad!")
    //     }
    // }

    return {
        blog_title: attrs.title,
        time: attrs.publishedAt,
        blocks: attrs.blocks,
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