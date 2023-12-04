/// <reference path="../pb_data/types.d.ts" />

routerAdd('GET', '/api/v1/chats', c => {
    return c.json(200, { holaaa: 'mundooo' });
});

// Crear un chat
routerAdd('POST', '/api/v1/chats', c => {
    const info = $apis.requestInfo(c);
    const { data, authRecord: user } = info;
    const toId = data.userId;
    const fromId = user.id;
    const chat = new DynamicModel({
        id: '',
        users: []
    });

    try {
        $app.dao().db()
            .select('id', 'users')
            .from('chats')
            .where($dbx.exp('json_array_length(chats.users) = 2'))
            .andWhere($dbx.like('users', toId, fromId))
            .one(chat)
    } catch (e) { }

    if (chat.id !== '') {
        return c.json(400, {
            "code": 400,
            "message": "Ya existe un chat con esta persona",
            "data": { 'chatId': chat.id }
        })
    }

    const collection = $app.dao().findCollectionByNameOrId('chats');
    const toUser = $app.dao().findRecordById('users', toId);

    const settings = new DynamicModel({
        nicknames: [
            {
                id: fromId,
                name: user.get('name')
            },
            {
                id: toId,
                name: toUser.get('name')
            },
        ],
        random: $security.randomString(10),
        lastMessage: {
            id: '',
            message: '',
            fromId: ''
        }
    });

    const record = new Record(collection, {
        users: [toId, fromId],
        settings
    })

    $app.dao().saveRecord(record);

    return c.json(201, record);
},
    $apis.activityLogger($app),
    $apis.requireRecordAuth('users')
)

// Mandar un mensaje a un chat
routerAdd('POST', '/api/v1/chats/:chatId/messages', c => {
    const info = $apis.requestInfo(c);
    const { data, authRecord: user } = info;
    const chatId = c.pathParam('chatId')

    const chatRecord = $app.dao().findRecordById('chats', chatId);
    const collection = $app.dao().findCollectionByNameOrId('messages')

    const canAccess = $app.dao().canAccessRecord(chatRecord, info, chatRecord.collection().viewRule)
    if (!canAccess) {
        throw new ForbiddenError('No tienes permitido publicar en este chat')
    }

    const messageRecord = new Record(collection, {
        chat: chatRecord.id,
        from: user.id,
        message: data.message.trim(),
        read: null
    });
    const settings = new DynamicModel({
        nicknames: [],
        random: '',
        lastMessage: {}
    });
    chatRecord.unmarshalJSONField('settings', settings);
    // Esto para forzar a Pocketbase que actualice el registro de "chats"
    // Y asi actualizar la interfaz
    settings.random = $security.randomString(10);
    settings.lastMessage = {
        id: messageRecord.getId(),
        message: messageRecord.getString('message'),
        fromId: user.id
    }
    chatRecord.set('settings', settings);

    $app.dao().runInTransaction(trx => {
        trx.saveRecord(messageRecord);
        trx.saveRecord(chatRecord)
    });

    return c.json(201, messageRecord);
},
    $apis.activityLogger($app),
    $apis.requireRecordAuth('users')
)