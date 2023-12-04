/// <reference path="../pb_data/types.d.ts" />

onModelBeforeCreate((e) => {
    const utils = require(`${__hooks}/helpers/user_username_gerenate.js`)

    e.model.set('username', utils.generateUsername())
}, 'users')