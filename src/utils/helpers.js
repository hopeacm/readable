import moment from 'moment';

export function getUUID8 () {
    return Math.random().toString(36).substr(-8);
}

export function getUUID16 () {
    return `${getUUID8()}${getUUID8()}`;
}

export function getUUID32 () {
    return `${getUUID8()}${getUUID8()}${getUUID8()}${getUUID8()}`;
}

export function arrayToObject (array, keyField) {
    return array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});
}

export function normalize (str = '') {
    return typeof str !== 'string' || (str = str.trim().replace(/\s\s+/g, ' ')) === '' ? '' : str;
}

export function capitalize (str = '') {
    str = normalize(str);
    if (str.length === 0) {
        return '';
    }
    const punctuations = ['.', '!', '?']
    for (let i = 0; i < punctuations.length; i++) {
        str = str
            .split(`${punctuations[i]} `)
            .map(sentence => sentence[0].toUpperCase() + sentence.slice(1))
            .join(`${punctuations[i]} `);
    }
    return str;
}

export function title (str = '') {
    str = normalize(str);
    if (str.length === 0) {
        return '';
    }
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

export function truncateString (str = '', limit = 50) {
    str = normalize(str);
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

export function formatTimestamp (timestamp) {
    return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
}

export function formatItems (num = 0, upSign, downSign, singular, plural) {
    return normalize([
            num >= 0 ? upSign : downSign,
            Math.abs(num) !== 1 ? plural : singular
        ].join(' '));
}

export function formatNumItems (num = 0, upSign, downSign, singular, plural) {
    return `${Math.abs(num)} ${formatItems (num, upSign, downSign, singular, plural)}`;
}

export function extractPostProperties (post, category) {
    return {
        id: post.id,
        timestamp: formatTimestamp(post.timestamp),
        title: capitalize(post.title),
        body: capitalize(truncateString(post.body, 150)),
        author: title(post.author),
        categoryName: post.category,
        categoryPath: category && category.path ? category.path : '',
        categoryNameTitle: title(post.category),
        voteScoreIcon: formatItems(
            post.voteScore, 'fa-thumbs-up', 'fa-thumbs-down', null, null
        ),
        voteScoreText: formatNumItems(
            post.voteScore, null, null, 'vote', 'votes'
        ),
        commentCountIcon: formatItems(
            post.commentCount, null, null, 'fa-comment', 'fa-comments'
        ),
        commentCountText: formatNumItems(
            post.commentCount, null, null, 'comment', 'comments'
        )
    };
}

export function extractPostDetailProperties (post) {
    return {
        ...extractPostProperties(post, null),
        body: capitalize(post.body, 150)
    };
}

export function extractCommentProperties (comment) {
    return {
        id: comment.id,
        timestamp: formatTimestamp(comment.timestamp),
        body: capitalize(comment.body),
        author: title(comment.author),
        voteScoreIcon: formatItems(
            comment.voteScore, 'fa-thumbs-up', 'fa-thumbs-down', null, null
        ),
        voteScoreText: formatNumItems(
            comment.voteScore, null, null, 'vote', 'votes'
        )
    };
}

export function emptyFunction() {
    ;
}