migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pswu8gut48v7qck")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkgr55nn",
    "name": "user_id",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pswu8gut48v7qck")

  // remove
  collection.schema.removeField("bkgr55nn")

  return dao.saveCollection(collection)
})
