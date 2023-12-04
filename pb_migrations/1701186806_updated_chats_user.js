/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcpzqjdkw4dhh3j")

  collection.options = {
    "query": "SELECT id, users, \"hola\" FROM chats"
  }

  // remove
  collection.schema.removeField("2kmfprkg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tuok9kuh",
    "name": "users",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": 2,
      "maxSelect": 10,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p2pw3xra",
    "name": "hola",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcpzqjdkw4dhh3j")

  collection.options = {
    "query": "SELECT id, users FROM chats"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2kmfprkg",
    "name": "users",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": 2,
      "maxSelect": 10,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("tuok9kuh")

  // remove
  collection.schema.removeField("p2pw3xra")

  return dao.saveCollection(collection)
})
