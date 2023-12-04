/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("f2yk0u3p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wpdjyffh",
    "name": "chat",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yy1l5mscrswt2mf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fhazvidg",
    "name": "read",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = "to.id = @request.auth.id || from.id = @request.auth.id"
  collection.viewRule = "to.id = @request.auth.id || from.id = @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f2yk0u3p",
    "name": "to",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("wpdjyffh")

  // remove
  collection.schema.removeField("fhazvidg")

  return dao.saveCollection(collection)
})
