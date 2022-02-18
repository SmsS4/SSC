import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { Timeline } from 'antd';
import { List, Avatar, Space } from 'antd';
import React from 'react';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { appendStrUrl } from './StrApi';

function getBlogData(item) {
    // TODO: extract data from 'item' object
    return {
        blog_title: 'TITLE',
    }
}

function BlogPost({item}) {
    const {
        blog_title,
    } = getBlogData(item);

    // TODO: render blog data
    return (
        <div>
            سلام
        </div>
    )
}

export default BlogPost