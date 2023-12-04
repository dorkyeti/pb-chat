/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qcpzqjdkw4dhh3j",
    "created": "2023-11-28 15:51:36.038Z",
    "updated": "2023-11-28 15:51:36.038Z",
    "name": "chats_user",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, users FROM chats"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qcpzqjdkw4dhh3j");

  return dao.deleteCollection(collection);
})
