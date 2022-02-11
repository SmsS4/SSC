import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { SEARCH_FOR_BLOGS_AND_WRITERS } from './enums';
import { STR_API_ADDRESS } from './config';
import { appendStrUrl } from './StrApi';
import { useState } from 'react';
import { Button } from 'antd/lib/radio';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ListViewer({getDataMethod, listViewerSearchFor}) {
    console.log("render list viewer")
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetchedAll, setFetchedAll] = useState(false);
    const [listData, setListData] = useState([])

    const checkPageDone = (data) => {
      return data.meta.pagination.page >= data.meta.pagination.pageCount
    }
    function renderBlogsAndWriters(value) {
      console.log('renderBlogsAndWriters', pageNumber);
      value.writers.data.forEach((writer) =>{
        listData.push({
          href: 'https://ant.design',
          title: writer.attributes.first_name + ' ' + writer.attributes.last_name,
          avatar: appendStrUrl(writer.attributes.avatar.data.attributes.formats.thumbnail.url),
          image: appendStrUrl(writer.attributes.avatar.data.attributes.url),
          description: writer.attributes.bio,
          content: writer.attributes.bio,
          likes: 0,
          comments: 0,
          uid: 'w' + writer.id,
        });
      })
      value.blogs.data.forEach((blog) =>{
        let icon = 'https://joeschmoe.io/api/v1/' + blog.id
        let image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACmpqZISEjIyMg+Pj4PDw+4uLguLi7x8fGCgoKzs7MUFBSvr68bGxvY2Nju7u719fXh4eHo6Oienp5jY2NSUlIiIiLT09NfX18rKyu+vr5XV1eUlJSLi4sKCgp4eHh7e3seHh5CQkIqdrqWAAADl0lEQVR4nO2daXeqMBRFAbWCUhXnOtXh///HEvuekBAcibn39uyPpSzOXieGILgIgjcyib5W4eormrzzoG8k24f/2We+w7hgHJYZ+47TPJNQR95IHRiGR9+BmmYamkx9R2qYimAY+o7ULG2LYdt3qEbZWgy3vkM1ysFieHhvhHVv03HHKbUYpieHR9z01pqfbRDxp/gYDH1HccbwV3DpO4dDzoqJ7xROSXLDme8QTpmZS355jC0LRllEwdx3BMfMg6PvCI5ZlBb9u0gOu0KrZDh82xLRPUMYsgeG/IEhf2DIH7th1JZDVDJchLJZ/IFrC+nXh1PBX7T9ks+fsofpJqjeupTF+Ubs2ncKh/y7v2W79SWDyw28kczvTGej0ipnPJ3HxabvD558FwrxfFp93KN12Rw5XTO6o1irtazbYUgfGMKQPjCEIX1gCEP6wBCG9IEhDOkDQxjSB4YwpA8MYUgfGMKQPjCEIX1gCEP6wBCG9IEhDOkDQxjSB4YwpA8MYUgfGMKQPjCEIX1gCEP6wBCG9IEhDOkDQxjSB4YwpA8MYUgfGMKQPjCEIX1gCEP6wBCG9IEhDOkDQxjSB4YwpA8MYUgfGMKQPjCEIX1gCEP6wBCG9IEhDOkDQxjSB4YwpA8M/5Lhft3lyHp/w1DS6+VmVsOd71gNsrMaSnoNYttqGNzekQ01U5GcF+dOawyD+Pa+LIjrBIOR72gNMao1DEYr3+EaIL4imLP1ne9ltlf9crLurBO7Ib2kSB0doTPrZrcEXdK7GPZ8xnAIDPkDQ/7AkD8w5A8M+QND9iSLi+Ei8R3GBdmgdBE38HqR44YkDcuk4lpMBqHOQJii0aC8FisNSmvR0qCsFq0NSmoxszd4blHEScMYogdxAzXTh2g/6Atr0Wiwm/+pK6rFxGxQobfIe7qxNKiQ06K1QYWUFo0G+6VNxnTDVLG2QYXR4vVbfkTJ6htU6IofDFu82qDCGKjsWqyc6Kt8sv4sXplkCoyByqpFY4h+1vwb3xbvalDBdbq5s0EFzxbvblChK/Jo8YEGFUaLDKYb40R/S7DSIvnrxQcbVOiK1JfhyaMNKnTFI+kWEy3rjUmmQD9pLCgrdp5oUKG3aH/QngT6k+L3NqjQW1w6S/gq2qOb9zeo0Fqk+4uW3dOCeou1j2l7p/+8oNZizW8JKPCCYEnxo/FczbF+QbAYAnQnmpzlKU8YPxvxvHdr3Gii4AeDbVUAV6IQeQAAAABJRU5ErkJggg=='
        if (blog.attributes.writer.data) {
          icon = appendStrUrl(blog.attributes.writer.data.attributes.avatar.data.attributes.formats.thumbnail.url)
          image = appendStrUrl(blog.attributes.writer.data.attributes.avatar.data.attributes.url)     
        }
        listData.push({
          href: 'https://ant.design',
          title: blog.attributes.title ,
          avatar: icon,
          image: image,
          description: blog.attributes.description,
          content: blog.attributes.description,
          likes: 0,
          comments: 0,
          uid: 'b' + blog.id,
        });
      })
      if (checkPageDone(value.writers) && checkPageDone(value.blogs)){
        setFetchedAll(true)
      }
      setListData(listData);
      console.log(listData.length);

    }

    const renders = {
      SEARCH_FOR_BLOGS_AND_WRITERS: renderBlogsAndWriters
    }

    function dataCallback(value) {
      console.log("dataCallback result recived", value)
      console.log("Length of listData is ", listData.length)
      renders[listViewerSearchFor](value)
      setLoading(false)
    }

    React.useEffect(() => {
      console.log("Page number is ", pageNumber);
      console.log("calling get data")
      getDataMethod(dataCallback, pageNumber)
    }, []);
    


    const onLoadMore = () => {
      console.log('onLoadMore')
      console.log(pageNumber);
      setPageNumber(pageNumber + 1)
      setLoading(true)
      getDataMethod(dataCallback, pageNumber + 1)
    }

    const loadMore = !loading && !fetchedAll ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
      
    function renderItem(item) {
      return (
      <List.Item
      key={item.uid}
      actions={[
        <IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o" />,
        <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" />,
      ]}
      extra={
        <img
          width={172}
          alt="logo"
          src={item.image}
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={item.avatar} />}
        title={<a href={item.href}>{item.title}</a>}
        description={item.description}
      />
      {item.content}
    </List.Item>
      )
    }
    return (
      <List
      key = {123}
      style={{marginLeft: '60px'}}
      itemLayout="vertical"
      size="large"
      loadMore={loadMore}
      dataSource={listData}
      renderItem={renderItem}
  />
    )
}

export default ListViewer;