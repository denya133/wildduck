/* global db */
'use strict';

db.users.createIndex({
    username: 1
});

db.mailboxes.createIndex({
    username: 1
});
db.mailboxes.createIndex({
    username: 1,
    path: 1
});
db.mailboxes.createIndex({
    username: 1,
    subscribed: 1
});

db.messages.createIndex({
    mailbox: 1
});

db.messages.createIndex({
    mailbox: 1,
    unseen: 1
});
db.messages.createIndex({
    mailbox: 1,
    uid: 1
});
db.messages.createIndex({
    mailbox: 1,
    uid: 1,
    modseq: 1
});
db.messages.createIndex({
    mailbox: 1,
    flags: 1
});

db.messages.createIndex({
    modseq: 1
});

db.messages.createIndex({
    modseq: -1
});

db.messages.createIndex({
    flags: 1
});

db.messages.createIndex({
    internaldate: 1
});
db.messages.createIndex({
    internaldate: -1
});

db.messages.createIndex({
    headerdate: 1
});
db.messages.createIndex({
    headerdate: -1
});

db.messages.createIndex({
    size: 1
});
db.messages.createIndex({
    size: -1
});

db.messages.createIndex({
    uid: 1
});
db.messages.createIndex({
    uid: -1
});

db['attachments.files'].createIndex({
    'metadata.messages': 1
});

db.journal.createIndex({
    mailbox: 1,
    modseq: 1
});

db.journal.createIndex({
    created: 1
}, {
    expireAfterSeconds: 21600
});
