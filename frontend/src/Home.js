import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

function Home() {
  return (
  <>
    <div>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </div>
    <div>
      <Avatar shape="square" size={64} icon={<UserOutlined />} />
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
    <GridWrapper>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
      <p>This is a paragraph and I am writing on the home page</p>
      <p>This is another paragraph, hi hey hello whatsup yo</p>
    </GridWrapper>
  </>
  )
}

export default Home;