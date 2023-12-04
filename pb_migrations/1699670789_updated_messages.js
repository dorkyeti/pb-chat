/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = "to.id = @request.auth.id || from.id = @request.auth.id"
  collection.viewRule = "to.id = @request.auth.id || from.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9rfyedp3rqqxgrv")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
