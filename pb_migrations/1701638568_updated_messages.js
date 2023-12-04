/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = "chat.id = @collection.chats.id"
  collection.viewRule = "chat.id = @collection.chats.id"

  return dao.saveCollection(collection)
})
