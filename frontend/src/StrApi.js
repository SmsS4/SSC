import axios from 'axios';
import { toast } from 'react-toastify';
import qs from 'qs'
import {STR_API_ADDRESS} from './config'
import { ORIGINAL, SMALL } from './enums';
const URL = STR_API_ADDRESS;

let defaultPageSize = 10;

function failed(section, response) {
    toast.error(`Failed get ${section}. error: ${response.status}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

function callStrApi(section, route, query, callback) {
    const path = URL+'/api'+route + "?" + qs.stringify(query);
    console.log(path)
    axios.get(path).then(response => {
        if (response.status == 200) {
            callback(response.data)
        }else {
            failed(section, response)
        }
    });
}

function setPageSize(newPageSize) {
    defaultPageSize = newPageSize;
}


///////////////////////

function contains(value, fields, relations = []) {
    let result = []
    fields.forEach(field => {
        const tmp = {}
        tmp[field] = {$containsi: value}
        result.push(tmp)
    });
    relations.forEach(relation => {
        const realationMap = {}
        const fieldMap = {}
        fieldMap[relation.field] = {
            $containsi: value
        }
        realationMap[relation.collection] = fieldMap;
        result.push(realationMap)
    })
    return {$or: result}
}
////////

function getBlogs(callback, pageNumber) {
    let q = {
        sort: ['publishedAt:asc'],
        populate: '*',
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("blogs", "/blogs", q, callback);
}

function getWriters(callback, pageNumber) {
    let q = {
        sort: ['publishedAt:asc'],
        populate: '*',
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("writers", "/writers", q, callback);
}

function getWriter(callback, writerId) {
    let q = {
        populate: ['blogs', 'avatar'],
    }
    callStrApi("get-writer", "/writers/" + writerId, q, callback);
}

function getBlog(callback, blogId) {
    let q = {
        populate: ['blocks', 'blocks.media'],
    }
    callStrApi("get-blog", "/blogs/" + blogId, q, callback);
}

function getBlogsByTag(callback, value, pageNumber) {
    let q = {
        sort: ['publishedAt:asc'],
        filters: contains(
            value,
            [],
            [
                {collection:"tags", field: "tag"},
            ]
        ),
        populate: ['writer', 'writer.avatar'],
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("get-blgos-by-tag", "/blogs" , q, callback);

}

function searchWriters(callback, value, pageNumber) {
    let q = {
        sort: ['publishedAt:asc'],
        filters: contains(value, ['first_name', 'last_name']),
        populate: ['avatar'],
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("serach-writers", "/writers", q, callback)
}

function searchBlogs(callback, value, pageNumber) {
    let q = {
        sort: ['publishedAt:asc'],
        populate: ['writer', 'writer.avatar'],
        filters: contains(
            value,
            ['title'],
            [
                {collection:"tags", field:"tag"},
                {collection:"writer", field:"first_name"},
                {collection:"writer", field:"last_name"},
            ]
        ),
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("serach-blogs", "/blogs", q, callback)
}

function searchTags(callback, value, pageNumber) {
    let q = {
        sort: ['updatedAt:asc'],
        populate: ['blogs'],
        filters: contains(
            value,
            ['tag']
        ),
        pagination: {
            pageSize: defaultPageSize,
            page: pageNumber,
        },
    }
    callStrApi("serach-tags", "/tags", q, callback)
}

function search(callback, value, pageNumber) {
    const wrapperCallback = (writers) => {
        const wrapperForTag = (blogs) => {
            searchTags(
                (tags) => {
                    callback(
                        {
                            'writers': writers,
                            'blogs': blogs,
                            'tags': tags,
                        }
                    )
                },
                value,
                pageNumber
            )
        };
        searchBlogs(wrapperForTag, value, pageNumber)
    };
    searchWriters(wrapperCallback, value, pageNumber)
}

function appendStrUrl(url) {
    return STR_API_ADDRESS + url
}

export {defaultPageSize, getBlogsByTag, getWriter, getBlog, appendStrUrl, search, searchTags, searchWriters, searchBlogs, getBlogs, getWriters, setPageSize}



