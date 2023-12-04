/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  // remove
  collection.schema.removeField("rkxdjqai")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rkxdjqai",
    "name": "rich",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
